"use client";

import MessageBox from "@/components/MessageBox";
import MessageList from "@/components/MessageList";
import { Separator } from "@/components/Separator";
import { useUser } from "@/providers/UserProvider";

export default function MessagePage() {
  const { user } = useUser();
  if (!user) {
    return;
  }
  return (
    <div className="pt-2">
      <h2 className="text-sm font-bold text-primary px-2">Messages</h2>
      <div className="flex flex-col lg:flex-row">
        <MessageList />
        <Separator className="lg:hidden my-2" />
        <MessageBox />
      </div>
    </div>
  );
}
