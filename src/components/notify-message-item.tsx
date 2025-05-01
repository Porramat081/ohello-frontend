import { MessageType } from "@/types/message";
import { Avatar, AvatarImage } from "./Avatar";

interface NotifyMessageItemProps {
  sender: string;
  message: MessageType[];
}

export default function NotifyMessageItem(props: NotifyMessageItemProps) {
  return (
    <div className="flex gap-2 items-center">
      <Avatar>
        <AvatarImage
          src={
            "https://cdn.pixabay.com/photo/2025/04/17/23/16/ai-generated-9541375_1280.jpg"
          }
        ></AvatarImage>
      </Avatar>

      <div className="text-xs truncate">
        <span>{props.sender}</span>
        <div className="truncate">{props.message[0].content}</div>
      </div>
    </div>
  );
}
