import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import MenuUserButton from "./MenuUserButton";
import { Button } from "./Button";

export default function MenuUser() {
  return (
    <div className="flex items-start flex-col gap-3">
      <div className="pt-2 px-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <MenuUserButton icon={User} title="user" />
      <MenuUserButton icon={User} title="usergrgr" />
      <MenuUserButton icon={User} title="usegrgrgrgr" />
      <MenuUserButton icon={User} title="usgrger" />
      <MenuUserButton icon={User} title="usrgrgrger" />
      <Button className="mt-4 cursor-pointer">New Post</Button>
    </div>
  );
}
