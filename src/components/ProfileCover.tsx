import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";
import { Camera, LogOut, MessageCircle, UserPlus2 } from "lucide-react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "./Button";
import { useRef, useState } from "react";
import { errorAxios } from "@/lib/errorHandle";
import { updateUser } from "@/apis/user";

interface ProfileCoverProps {
  imgSrc: string | undefined;
}

const isUser = true;
const isFriend = true;

export default function ProfileCover({ imgSrc }: ProfileCoverProps) {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (event.target.files) {
        const file = event.target.files[0];

        console.log(file);

        if (file) {
          const newFormData = new FormData();
          newFormData.append("profileCoverUrl", file);
          const res = await updateUser(newFormData);
        }
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      errorAxios(error);
    } finally {
    }
  };
  const handleLogout = () => {};
  return (
    <div className="relative h-[200px] w-auto">
      {imgSrc ? (
        <>
          <Image
            src={imgSrc}
            alt="profile-cover"
            fill
            sizes=""
            className="absolute top-0 left-0 object-fill aspect-video"
          />
          <div className="z-10 flex flex-col items-center relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={(event) => handleFileChange(event)}
            />
            <button
              className="flex flex-col items-center justify-center hover:text-primary cursor-pointer"
              type="button"
              onClick={triggerFileInput}
            >
              <Camera size={20} />
              <span className="text-xs font-semibold">
                {imgSrc ? "Edit Photo" : "Add Photo"}
              </span>
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full bg-secondary ">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={(event) => handleFileChange(event)}
          />
          <button
            className="flex flex-col items-center justify-center hover:text-primary cursor-pointer"
            type="button"
            onClick={triggerFileInput}
          >
            <Camera size={20} />
            <span className="text-xs font-semibold">Add Photo</span>
          </button>
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
