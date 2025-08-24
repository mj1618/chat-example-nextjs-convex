import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  chatMessages: defineTable({
    uniqueId: v.string(),
    content: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")),
  }).index("uniqueId", ["uniqueId"]),
});
