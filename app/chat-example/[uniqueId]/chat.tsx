"use client";

import { ReactNode } from "react";

export default function Chat({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Prompt Messages Container - Modify the height according to your need */}
      <div className="flex h-[100vh] w-full">{children}</div>
    </>
  );
}
