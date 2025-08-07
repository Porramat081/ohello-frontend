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
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import { Button } from "@/components/Button";
import Link from "next/link";

export default function MessagePage() {
  const [targetId, setTargetId] = useState<string>("");

  const [roomList, setRoomList] = useState<any[]>([]);

  const [roomId, setRoomId] = useState("");

  const { user } = useUser();
  const loader = useLoading();
  const { changeRoute } = useAuthorize();
  const searchParams = useSearchParams();
  const firstNameParam = searchParams.get("f");
  const surnameParam = searchParams.get("s");

  const client = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLY_KEY });

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
    <AblyProvider client={client}>
      <div className="pt-2">
        <h2 className="text-sm font-bold text-primary px-2">Messages</h2>
        <div className="flex flex-col">
          <MessageList
            targetId={targetId}
            roomList={roomList}
            handleChangeRoom={handleChangeRoom}
          />
          <Separator className="my-2" />
          {targetId ? (
            <ChannelProvider channelName={roomId}>
              <MessageBox
                roomId={roomId}
                setRoomId={setRoomId}
                targetId={targetId}
                handleChangeRoom={handleChangeRoom}
                userId={user.id}
                userFullName={user.firstName + " " + user.surname}
              />
            </ChannelProvider>
          ) : roomList?.length ? (
            <div>Please Select Chat To Start</div>
          ) : (
            <div className="flex flex-col items-center gap-5 mt-3">
              <div className="text-center">You don't have any friends</div>
              <div className="">
                <Button className="cursor-pointer" asChild>
                  <Link href={"/friend"}>Find New Friends</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AblyProvider>
  );
}
