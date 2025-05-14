"use client";

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
import Modal from "./Modal";
import PostModal from "./PostModal";
import { useState } from "react";

export default function MenuUser() {
  const [openModal, setOpenModal] = useState(false);

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
      <Button
        onClick={() => setOpenModal(true)}
        className="mt-4 cursor-pointer flex justify-center items-center text-xs dark:text-white"
      >
        <Plus />
        New Post
      </Button>

      <Modal
        title="Post Something"
        isOpen={openModal}
        onOpenChange={setOpenModal}
      >
        <PostModal />
      </Modal>
    </div>
  );
}
