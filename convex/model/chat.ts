import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { OpenAI } from "openai";
import { api, internal } from "../_generated/api";
import { Doc, Id } from "../_generated/dataModel";
import {
  action,
  internalAction,
  internalMutation,
  mutation,
  query,
} from "../_generated/server";

export const deleteChat = mutation({
  args: {
    chatId: v.id("chats"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.chatId);
    const messages = await ctx.db
      .query("chatMessages")
      .withIndex("chatId", (q) => q.eq("chatId", args.chatId))
      .collect();
    await Promise.all(messages.map((message) => ctx.db.delete(message._id)));
  },
});

export const createChat = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const chatId = await ctx.db.insert("chats", {
      userId,
    });

    return chatId;
  },
});

export const listChats = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const chats = await ctx.db
      .query("chats")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return await Promise.all(
      chats.map(async (chat) => ({
        chatId: chat._id,
        firstMessage:
          (
            await ctx.db
              .query("chatMessages")
              .withIndex("chatId", (q) => q.eq("chatId", chat._id))
              .first()
          )?.content ?? "New chat...",
      })),
    );
  },
});

export const getChat = query({
  args: {
    chatId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    if (ctx.db.normalizeId("chats", args.chatId) == null) {
      return [];
    }

    const chat = await ctx.db
      .query("chats")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("_id"), args.chatId))
      .first();

    if (!chat) {
      return [];
    }

    return await ctx.db
      .query("chatMessages")
      .withIndex("chatId", (q) => q.eq("chatId", chat._id))
      .collect();
  },
});

export const createChatMessage = internalMutation({
  args: {
    chatId: v.id("chats"),
    content: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    await ctx.db.insert("chatMessages", {
      chatId: args.chatId,
      content: args.content,
      role: args.role,
    });
  },
});

export const submitChatMessage = action({
  args: {
    chatId: v.id("chats"),
    content: v.string(),
  },
  handler: async (ctx, args): Promise<void> => {
    await ctx.runMutation(internal.model.chat.createChatMessage, {
      chatId: args.chatId,
      content: args.content,
      role: "user",
    });

    await ctx.runMutation(internal.model.chat.createChatMessage, {
      chatId: args.chatId,
      content: "...",
      role: "assistant",
    });

    const messages = await ctx.runQuery(api.model.chat.getChat, {
      chatId: args.chatId,
    });

    await ctx.scheduler.runAfter(0, internal.model.chat.chat, {
      messages,
      messageId: messages[messages.length - 1]._id,
    });
  },
});

export const updateChatMessage = internalMutation({
  args: {
    messageId: v.id("chatMessages"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.messageId, {
      content: args.content,
    });
  },
});

export const chat = internalAction({
  handler: async (
    ctx,
    {
      messages,
      messageId,
    }: {
      messages: Doc<"chatMessages">[];
      messageId: Id<"chatMessages">;
    },
  ) => {
    const apiKey = process.env.OPENAI_API_KEY!;
    const openai = new OpenAI({ apiKey });

    console.log("chat", messages, messageId);

    try {
      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        stream: true,
        messages: [
          {
            role: "system",
            content: "Be helpful and friendly, respond in about one paragraph.",
          },
          ...messages.map(({ content, role }) => ({
            role: role,
            content: content,
          })),
        ],
      });
      let content = "";
      for await (const part of stream) {
        if (part.choices[0].delta?.content) {
          content += part.choices[0].delta.content;
          // Alternatively you could wait for complete words / sentences.
          // Here we send an update on every stream message.
          await ctx.runMutation(internal.model.chat.updateChatMessage, {
            messageId,
            content: content,
          });
        }
      }
    } catch (e: any) {
      if (e instanceof OpenAI.APIError) {
        console.error(e.status);
        console.error(e.message);
        await ctx.runMutation(internal.model.chat.updateChatMessage, {
          messageId,
          content: "OpenAI call failed: " + e.message,
        });
        console.error(e);
      } else {
        throw e;
      }
    }
  },
});
