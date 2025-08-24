import ConvexClientProvider from "@/components/convex-client-provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChatExample",
  description: "Chat Example",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white dark:bg-gray-900">
      <body className="h-full">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
