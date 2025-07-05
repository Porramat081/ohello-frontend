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

      <div className="text-xs truncate w-full">
        <div className="flex justify-between gap-2 items-center pr-1">
          <span className="custom-ellipsis inline-block">
            {item.user?.firstName + " " + item.user?.surname}
          </span>
          {!item.lastStatus && (
            <div className="bg-primary size-2 rounded-full"></div>
          )}
        </div>
        <div className="truncate">{item.Message?.content}</div>
      </div>
    </div>
  );
}
