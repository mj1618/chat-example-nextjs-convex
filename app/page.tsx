"use client";
import { FullPageLoader } from "@/components/full-page-loader";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function IndexPage() {
  const getUserQuery = useQuery(api.model.user.getUser);
  const router = useRouter();

  useEffect(() => {
    if (getUserQuery == null) {
      return;
    }
    if (getUserQuery.user == null) {
      router.push("/login");
    } else {
      router.push("/chat-example/1234");
    }
  }, [getUserQuery, router]);

  return <FullPageLoader />;
}
