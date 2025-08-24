import { ArrowUpIcon } from "lucide-react";
import { useRef, useState } from "react";

export default function ChatPrompt({
  onSubmit,
}: {
  onSubmit: (message: string) => void;
}) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim().length === 0) return;
    setMessage("");
    onSubmit(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim().length === 0) return;
      setMessage("");
      onSubmit(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full items-center bg-slate-200 p-2 dark:border-slate-700 dark:bg-slate-900 max-w-4xl mx-auto"
    >
      <label htmlFor="chat" className="sr-only">
        Enter your prompt
      </label>
      <textarea
        id="chat-input"
        ref={textareaRef}
        rows={2}
        className="field-sizing-content pb-12 pr-12 resize-none mx-2 flex min-h-full w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-base text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50 dark:placeholder-slate-400 dark:focus:border-blue-600 dark:focus:ring-blue-600"
        placeholder="Enter your prompt"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div className="flex items-center justify-center absolute right-7">
        <button
          onClick={(e) => {
            e.preventDefault();
            onSubmit(message);
            document.getElementById("chat-input")?.focus();
          }}
          type="button"
          className="rounded-full bg-slate-900 p-2 text-white shadow-sm hover:bg-slate-700"
        >
          <ArrowUpIcon className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
