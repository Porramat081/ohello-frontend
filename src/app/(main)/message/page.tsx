"use client";

import { getChatRoom } from "@/apis/message";
import MessageBox from "@/components/MessageBox";
import MessageList from "@/components/MessageList";
import { Separator } from "@/components/Separator";
import { useAuthorize } from "@/hooks/useForm";
import { errorAxios } from "@/lib/errorHandle";
import { useLoading } from "@/providers/LoaderProvider";
import { useUser } from "@/providers/UserProvider";
import { useEffect, useState } from "react";

export default function MessagePage() {
  const [roomId, setRoomId] = useState<string>("");

  const [roomList, setRoomList] = useState([]);

  const { user } = useUser();
  const loader = useLoading();
  const { changeRoute } = useAuthorize();

  const fetchRoomChat = async () => {
    try {
      loader?.setLoading(true);
      const res = await getChatRoom();
      if (res.success) {
        setRoomList(res.chatRooms);
        console.log(res.chatRooms);
      }
    } catch (error) {
      errorAxios(error);
    } finally {
      loader?.setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      changeRoute();
    } else {
      fetchRoomChat();
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
        <MessageList
          roomId={roomId}
          roomList={roomList}
          handleChangeRoom={handleChangeRoom}
        />
        <Separator className="lg:hidden my-2" />
        <MessageBox roomId={roomId} handleChangeRoom={handleChangeRoom} />
      </div>
    </div>
  );
}
