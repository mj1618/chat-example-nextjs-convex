"use client";
import { ReactNode } from "react";

export default function ChatMessages({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 space-y-6 overflow-y-auto bg-slate-200 p-4 text-sm leading-6 text-slate-900 dark:bg-slate-900 dark:text-slate-300 sm:text-base sm:leading-7">
      {children}
    </div>
  );
}
