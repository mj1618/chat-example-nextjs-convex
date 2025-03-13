import { v } from "convex/values";
import { OpenAI } from "openai";
import { api, internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";
import {
  action,
  internalAction,
  internalMutation,
  query,
} from "./_generated/server";

type Message = {
  _id: Id<"chatMessages">;
  uniqueId: string;
  content: string;
  role: "user" | "assistant";
};

export const getChatMessages = query({
  args: {
    uniqueId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("chatMessages")
      .withIndex("uniqueId", (q) => q.eq("uniqueId", args.uniqueId))
      .collect();
  },
});

export const createChatMessage = internalMutation({
  args: {
    uniqueId: v.string(),
    content: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("chatMessages", {
      uniqueId: args.uniqueId,
      content: args.content,
      role: args.role,
    });
  },
});

export const submitChatMessage = action({
  args: {
    uniqueId: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args): Promise<void> => {
    await ctx.runMutation(internal.chat.createChatMessage, {
      uniqueId: args.uniqueId,
      content: args.content,
      role: "user",
    });

    await ctx.runMutation(internal.chat.createChatMessage, {
      uniqueId: args.uniqueId,
      content: "...",
      role: "assistant",
    });

    const messages = await ctx.runQuery(api.chat.getChatMessages, {
      uniqueId: args.uniqueId,
    });

    await ctx.scheduler.runAfter(0, internal.chat.chat, {
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
          await ctx.runMutation(internal.chat.updateChatMessage, {
            messageId,
            content: content,
          });
        }
      }
    } catch (e: any) {
      if (e instanceof OpenAI.APIError) {
        console.error(e.status);
        console.error(e.message);
        await ctx.runMutation(internal.chat.updateChatMessage, {
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
