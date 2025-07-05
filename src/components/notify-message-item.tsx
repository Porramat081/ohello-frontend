import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { genAbbration } from "@/lib/utils";

interface NotifyMessageItemProps {
  item: any;
}

export default function NotifyMessageItem({ item }: NotifyMessageItemProps) {
  return (
    <div className="flex gap-2 items-center">
      <Avatar>
        <AvatarImage src={item.user?.profilePicUrl?.pictureUrl}></AvatarImage>
        <AvatarFallback>
          {genAbbration(item.user?.firstName, item.user?.surname)}
        </AvatarFallback>
      </Avatar>

      <div className="text-xs truncate">
        <span>{item.user?.firstName + " " + item.user?.surname}</span>
        <div className="truncate">{item.Message?.content}</div>
      </div>
    </div>
  );
}
