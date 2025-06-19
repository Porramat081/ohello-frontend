"use client";

import MessageBox from "@/components/MessageBox";
import MessageList from "@/components/MessageList";
import { Separator } from "@/components/Separator";
import { useAuthorize } from "@/hooks/useForm";
import { useUser } from "@/providers/UserProvider";
import { useEffect, useState } from "react";

export default function MessagePage() {
  const [roomId, setRoomId] = useState<string>("");
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
  const handleChangeRoom = (rid: string) => {
    setRoomId(rid);
  };
  return (
    <div className="pt-2">
      <h2 className="text-sm font-bold text-primary px-2">Messages</h2>
      <div className="flex flex-col lg:flex-row">
        <MessageList roomId={roomId} handleChangeRoom={handleChangeRoom} />
        <Separator className="lg:hidden my-2" />
        <MessageBox roomId={roomId} handleChangeRoom={handleChangeRoom} />
      </div>
    </div>
  );
}
