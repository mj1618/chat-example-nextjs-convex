import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../_generated/server";

export const getUser = query({
  args: {},
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return {
        user: null,
      };
    }

    const chats = await ctx.db
      .query("chats")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return {
      user: await ctx.db.get(userId),
      chats: chats,
    };
  },
});
