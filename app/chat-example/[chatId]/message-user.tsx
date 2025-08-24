import { Doc } from "@/convex/_generated/dataModel";

export default function ChatMessageUser({
  message,
}: {
  message: Doc<"chatMessages">;
}) {
  return (
    <div className="flex flex-row-reverse items-start pt-6 w-full">
      <div className="flex rounded-xl bg-slate-50 p-4 dark:bg-slate-800 lg:max-w-md lg:max-w-2xl">
        <p>{message.content}</p>
      </div>
    </div>
  );
}
