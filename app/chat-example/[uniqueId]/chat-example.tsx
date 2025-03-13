"use client";

import ChatMessageUser from "./chat-message-user";

import { api } from "@/convex/_generated/api";
import { useAction, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import ChatContent from "./chat-content";
import ChatMessageAssistant from "./chat-message-assistant";
import ChatMessages from "./chat-messages";
import ChatPrompt from "./chat-promt";
import ChatSidebar from "./chat-sidebar";
import Chat from "./chat";

export default function ChatExample() {
  const { uniqueId } = useParams();
  const messagesQuery = useQuery(api.chat.getChatMessages, {
    uniqueId: uniqueId as string,
  });
  const submitMessageAction = useAction(api.chat.submitChatMessage);

  if (!messagesQuery) {
    return <>Loading...</>;
  }

  const handleSubmit = (message: string) => {
    submitMessageAction({
      uniqueId: uniqueId as string,
      content: message,
    });
  };

  return (
    <Chat>
      <ChatSidebar />
      <ChatContent>
        <ChatMessages>
          {messagesQuery?.map((message) =>
            message.role === "user" ? (
              <ChatMessageUser message={message} key={message._id} />
            ) : (
              <ChatMessageAssistant message={message} key={message._id} />
            ),
          )}
        </ChatMessages>
        <ChatPrompt onSubmit={handleSubmit} />
      </ChatContent>
    </Chat>
  );
}
