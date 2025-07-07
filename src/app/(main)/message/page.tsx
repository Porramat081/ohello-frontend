"use client";

import { getChatRoom } from "@/apis/message";
import MessageBox from "@/components/MessageBox";
import MessageList from "@/components/MessageList";
import { Separator } from "@/components/Separator";
import { useAuthorize } from "@/hooks/useForm";
import { errorAxios } from "@/lib/errorHandle";
import { useLoading } from "@/providers/LoaderProvider";
import { useUser } from "@/providers/UserProvider";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MessagePage() {
  const [targetId, setTargetId] = useState<string>("");

  const [roomList, setRoomList] = useState<any[]>([]);

  const { user } = useUser();
  const loader = useLoading();
  const { changeRoute } = useAuthorize();
  const searchParams = useSearchParams();
  const firstNameParam = searchParams.get("f");
  const surnameParam = searchParams.get("s");

  const fetchRoomChat = async () => {
    try {
      loader?.setLoading(true);
      const res = await getChatRoom();
      if (res.success) {
        setRoomList(res.chatRooms);
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

  useEffect(() => {
    if (roomList.length) {
      if (firstNameParam && surnameParam) {
        const targetUser = roomList.find(
          (item) =>
            item.firstName === firstNameParam && item.surname === surnameParam
        );
        if (targetUser) {
          handleChangeRoom(targetUser.id);
        }
      } else {
        handleChangeRoom(roomList[0].id);
      }
    }
  }, [roomList, firstNameParam, surnameParam]);

  if (!user || (!user.id && user.status !== "Active")) {
    return;
  }
  const handleChangeRoom = (rid: string) => {
    setTargetId(rid);
  };
  return (
    <div className="pt-2">
      <h2 className="text-sm font-bold text-primary px-2">Messages</h2>
      <div className="flex flex-col">
        <MessageList
          targetId={targetId}
          roomList={roomList}
          handleChangeRoom={handleChangeRoom}
        />
        <Separator className="my-2" />
        <MessageBox
          targetId={targetId}
          handleChangeRoom={handleChangeRoom}
          userId={user.id}
        />
      </div>
    </div>
  );
}
