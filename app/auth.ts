import { auth } from "@clerk/nextjs/server";

export async function getAuthToken() {
  try {
    return (await (await auth()).getToken({ template: "convex" })) ?? undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
