import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";
import { Camera, LogOut, MessageCircle, UserPlus2 } from "lucide-react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "./Button";

interface ProfileCoverProps {
  imgSrc: string | undefined;
}

const isUser = true;
const isFriend = true;

export default function ProfileCover({ imgSrc }: ProfileCoverProps) {
  const handleAddCoverImg = () => {};
  const handleLogout = () => {};
  return (
    <div className="relative h-[200px] w-auto">
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt="profile-cover"
          fill
          className="absolute top-0 left-0 object-fill aspect-video"
        />
      ) : (
        <div className="flex items-center justify-center h-full bg-secondary ">
          <div className="flex flex-col items-center justify-center">
            <Camera
              size={20}
              className="hover:text-primary cursor-pointer"
              onClick={handleAddCoverImg}
            />

            <span
              className="text-xs font-semibold hover:text-primary cursor-pointer"
              onClick={handleAddCoverImg}
            >
              Add Photo
            </span>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="absolute bottom-0 left-6 translate-y-[50%] w-full">
        <div className="flex items-center gap-3">
          <Avatar className="size-15 border-2 border-primary">
            <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span
              className="text-primary font-extrabold"
              style={{ WebkitTextStroke: "0.1px white" }}
            >
              John Doe
            </span>
            <span className="text-xs font-semibold text-foreground">
              @JohnDoeqq
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[-3rem] lg:bottom-0 translate-y-[50%] right-0 lg:right-6">
        <div className="flex gap-2 pr-2 lg:pr-0">
          {isUser ? (
            <Button
              variant={"destructive"}
              onClick={() => redirect("/auth/signin")}
            >
              <LogOut size={16} />
              Logout
            </Button>
          ) : (
            isFriend && (
              <>
                <Button>
                  <UserPlus2 size={16} />
                  Add
                </Button>
                <Button variant={"outline"}>
                  <MessageCircle size={16} />
                  Chat
                </Button>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
