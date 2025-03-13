import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  chatMessages: defineTable({
    uniqueId: v.string(),
    content: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")),
  }).index("uniqueId", ["uniqueId"]),
});
