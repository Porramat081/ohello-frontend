import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { genAbbration } from "@/lib/utils";
import { useChannel } from "ably/react";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface NotifyMessageItemProps {
  item: any;
}

export default function NotifyMessageItem({ item }: NotifyMessageItemProps) {
  const [notiCount, setNotiCount] = useState<number>(item.unreadCount || 0);
  const [notiMessage, setNotiMessage] = useState(item.Message?.content || "");

  const pathname = usePathname();

  const { channel } = useChannel(
    item.chatRoomId,
    "notify",
    (receiveMessage) => {
      if (pathname !== "/message") {
        setNotiCount((prev) => prev + 1);
      }
      const messageObj = JSON.parse(receiveMessage.data);
      setNotiMessage(messageObj.content);
    }
  );

  return (
    <div className="flex gap-2 items-center">
      <div className="relative">
        <Avatar>
          <AvatarImage src={item.user?.profilePicUrl?.pictureUrl}></AvatarImage>
          <AvatarFallback>
            {genAbbration(item.user?.firstName, item.user?.surname)}
          </AvatarFallback>
        </Avatar>
        {notiCount > 0 && (
          <div className="absolute top-[-0.2rem] right-[-0.2rem] text-[0.7rem] size-4 bg-red-700 text-white text-center rounded-full">
            {notiCount}
          </div>
        )}
      </div>

      <div className="text-xs truncate w-full">
        <div className="flex justify-between gap-2 items-center pr-1">
          <span className="custom-ellipsis inline-block">
            {item.user?.firstName + " " + item.user?.surname}
          </span>
          {!item.lastStatus && (
            <div className="bg-primary size-2 rounded-full"></div>
          )}
        </div>
        <div className="truncate">{notiMessage}</div>
      </div>
    </div>
  );
}
