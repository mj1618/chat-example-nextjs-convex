import { ChatMessage } from "./type";

export default function ChatMessageUser({ message }: { message: ChatMessage }) {
  return (
    <div className="flex items-start">
      <img
        className="mr-2 h-8 w-8 rounded-full"
        src="https://dummyimage.com/128x128/363536/ffffff&text=U"
      />
      <div className="flex rounded-b-xl rounded-tr-xl bg-slate-50 p-4 dark:bg-slate-800 sm:max-w-md md:max-w-2xl">
        <p>{message.content}</p>
      </div>
    </div>
  );
}
