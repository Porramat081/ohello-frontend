"use client";

import {
  History,
  Home,
  MessageCircle,
  Plus,
  UserRoundCog,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import MenuUserButton from "./MenuUserButton";
import { Button } from "./Button";
import { UserType } from "@/types/user";
import { genAbbration } from "@/lib/utils";
import { useAuthorize } from "@/hooks/useForm";
import { useUser } from "@/providers/UserProvider";

interface MenuUserProps {
  user: UserType & { profilePicUrl: string };
}

export default function MenuUser({ user }: MenuUserProps) {
  const { changeRoute } = useAuthorize();

  const { setActivePost } = useUser();

  return (
    <div className="flex items-start flex-col gap-5">
      <div className="pt-2 px-2 mb-3">
        <Avatar className="border border-foreground size-13">
          <AvatarImage src={user.profilePicUrl} />
          <AvatarFallback className="text-2xl font-semibold">
            {genAbbration(user?.firstName, user?.surname)}
          </AvatarFallback>
        </Avatar>
      </div>
      <MenuUserButton icon={Home} title="Home" href="/" />
      <MenuUserButton icon={MessageCircle} title="Messages" href="/message" />
      <MenuUserButton icon={Users} title="Friends" href="/friend" />
      {/* <MenuUserButton icon={History} title="History" href="/history" /> */}
      <MenuUserButton icon={UserRoundCog} title="My Profile" href="/profile" />
      <Button
        onClick={() => {
          const isAuthorize = changeRoute();
          if (isAuthorize) {
            setActivePost(true);
          }
        }}
        className="mt-4 cursor-pointer flex justify-center items-center text-xs dark:text-white"
      >
        <Plus />
        New Post
      </Button>
    </div>
  );
}
