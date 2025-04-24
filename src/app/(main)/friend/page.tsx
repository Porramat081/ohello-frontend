"use client";

import FriendList from "@/components/FriendList";
import { Separator } from "@/components/Separator";

export default function FriendPage() {
  return (
    <div>
      <h2 className="px-4 py-4 text-primary text-sm font-bold">Friend Lists</h2>
      <Separator />
      <FriendList />
    </div>
  );
}
