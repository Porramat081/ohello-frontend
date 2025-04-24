import {
  History,
  Home,
  MessageCircle,
  Plus,
  User,
  UserRoundCog,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import MenuUserButton from "./MenuUserButton";
import { Button } from "./Button";

export default function MenuUser() {
  return (
    <div className="flex items-start flex-col gap-5">
      <div className="pt-2 px-2 mb-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <MenuUserButton icon={Home} title="Home" href="/" />
      <MenuUserButton icon={MessageCircle} title="Messages" href="/message" />
      <MenuUserButton icon={Users} title="Friends" href="/friend" />
      <MenuUserButton icon={History} title="History" href="/history" />
      <MenuUserButton icon={UserRoundCog} title="My Profile" href="/profile" />
      <Button className="mt-4 cursor-pointer flex justify-center items-center text-xs">
        <Plus />
        New Post
      </Button>
    </div>
  );
}
