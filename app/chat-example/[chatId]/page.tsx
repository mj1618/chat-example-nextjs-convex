"use client";

import ChatMessageUser from "./message-user";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAction, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import ChatMessageAssistant from "./message-assistant";
import ChatPrompt from "./prompt";
import ChatSidebar from "./sidebar";

export default function Page() {
  const { chatId } = useParams();
  const chat = useQuery(api.model.chat.getChat, {
    chatId: chatId as Id<"chats">,
  });
  const submitMessageAction = useAction(api.model.chat.submitChatMessage);
  const chats = useQuery(api.model.chat.listChats);
  const router = useRouter();

  useEffect(() => {
    if (
      chats != null &&
      chats.find((chat) => chat.chatId === chatId) === undefined
    ) {
      if (chats.length > 0) {
        router.push(`/chat-example/${chats[0].chatId}`);
      }
    }
  }, [chats, router, chatId]);

  const handleSubmit = (message: string) => {
    submitMessageAction({
      chatId: chatId as Id<"chats">,
      content: message,
    });
  };

  return (
    <div className="flex lg:flex-row flex-col h-[100vh] w-full">
      <ChatSidebar />
      <div className="flex-1 flex w-full flex-col  bg-slate-200 lg:ml-64">
        <div className="max-w-4xl w-full mx-auto flex-1 space-y-6 overflow-y-auto bg-slate-200 p-4 text-sm leading-6 text-slate-900 dark:bg-slate-900 dark:text-slate-300 lg:text-base lg:leading-7">
          {chat?.map((message) =>
            message.role === "user" ? (
              <ChatMessageUser message={message} key={message._id} />
            ) : (
              <ChatMessageAssistant message={message} key={message._id} />
            ),
          )}
        </div>
        <ChatPrompt onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
