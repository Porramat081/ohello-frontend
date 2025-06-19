"use client";

import FriendList from "@/components/FriendList";
import { Separator } from "@/components/Separator";
import { useAuthorize } from "@/hooks/useForm";
import { useUser } from "@/providers/UserProvider";
import { useEffect } from "react";

export default function FriendPage() {
  const { user } = useUser();
  const { changeRoute } = useAuthorize();
  useEffect(() => {
    if (!user) {
      changeRoute();
    }
  }, [user]);
  if (!user || (!user.id && user.status !== "Active")) {
    return;
  }
  return (
    <div>
      <h2 className="px-4 py-4 text-primary text-sm font-bold">Friend Lists</h2>
      <Separator />
      <FriendList />
    </div>
  );
}
