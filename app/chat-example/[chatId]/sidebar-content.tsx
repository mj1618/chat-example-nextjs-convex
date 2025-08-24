import { cn } from "@/app/utils";
import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation, useQuery } from "convex/react";
import { Leaf, Loader2, LogOut, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatSidebar() {
  const chats = useQuery(api.model.chat.listChats);
  const deleteChat = useMutation(api.model.chat.deleteChat);
  const createChat = useMutation(api.model.chat.createChat);
  const router = useRouter();
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const { chatId } = useParams();
  const { signOut } = useAuthActions();

  useEffect(() => {
    if (chats != null && chats.length === 0) {
      (async () => {
        setIsCreatingChat(true);
        const chatId = await createChat();
        router.push(`/chat-example/${chatId}`);
      })();
    }
  }, [chats, createChat, router]);

  return (
    <>
      <div className="flex h-[100svh] w-full flex-col overflow-y-auto bg-slate-50 pt-8 dark:border-slate-700 dark:bg-slate-900 lg:h-[100vh] lg:w-64">
        <div className="flex px-4">
          {/* Logo */}
          <Leaf className="h-7 w-7 text-blue-600" />
          <h2 className="px-5 text-lg flex items-center font-medium text-slate-800 dark:text-slate-200">
            Chats
            <span
              className={cn(
                "mx-2 rounded-full bg-blue-600 px-2 py-1 text-xs text-slate-200",
                (chats?.length ?? 0) === 0 && "hidden",
              )}
            >
              {chats?.length}
            </span>
          </h2>
        </div>
        <div className="mx-2 mt-8">
          <button
            onClick={async () => {
              setIsCreatingChat(true);
              const chatId = await createChat();
              router.push(`/chat-example/${chatId}`);
            }}
            className=" cursor-pointer flex w-full gap-x-4 rounded-lg border border-slate-300 p-4 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {isCreatingChat ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
            {isCreatingChat ? "Starting..." : "New chat"}
          </button>
        </div>
        {/* Previous chats container */}
        <div className="flex-1 space-y-4 overflow-y-auto px-2 py-4">
          {/* {chats != null && chats.length === 0 && (
            <div className="text-center text-slate-500">No chats yet</div>
          )} */}
          {chats?.map((chat) => (
            <Link
              key={chat.chatId}
              prefetch={true}
              href={`/chat-example/${chat.chatId}`}
              className={cn(
                "flex w-full gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800 dark:bg-slate-800/50 cursor-pointer justify-between",
                chat.chatId === chatId && "bg-slate-200",
              )}
            >
              <h1 className="text-ellipsis truncate text-sm font-medium capitalize text-slate-700 dark:text-slate-200">
                {chat.firstMessage}
              </h1>

              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await deleteChat({ chatId: chat.chatId });
                }}
                className="text-red-800 hover:text-red-600 cursor-pointer"
              >
                <Trash className="h-4 w-4" strokeWidth={2} />
              </button>
            </Link>
          ))}
        </div>
        <div className="p-4 flex flex-col items-center justify-center">
          <button
            className="w-full cursor-pointer hover:underline text-sm flex items-center justify-center gap-x-2"
            onClick={async () => {
              await signOut();
              router.push("/login");
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}
