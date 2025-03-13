export type ChatMessage = {
  _id: string;
  uniqueId: string;
  content: string;
  role: "user" | "assistant";
};
