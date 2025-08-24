import { Doc } from "@/convex/_generated/dataModel";

export default function ChatMessageAssistant({
  message,
}: {
  message: Doc<"chatMessages">;
}) {
  return (
    <div className="flex items-start w-full">
      <div className="flex flex-col">
        <div className="flex min-h-[85px] p-4 lg:min-h-0">
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
}
