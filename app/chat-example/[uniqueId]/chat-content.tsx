"use client";

import { ReactNode } from "react";

export default function ChatContent({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Prompt Messages Container - Modify the height according to your need */}
      <div className="flex-1 flex h-[100vh] w-full flex-col">{children}</div>
    </>
  );
}
