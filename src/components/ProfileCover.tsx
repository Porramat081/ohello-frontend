import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { errorAxios } from "@/lib/errorHandle";
import { updateUser } from "@/apis/user";
import { genAbbration } from "@/lib/utils";
import { UserType } from "@/types/user";
import { useLoading } from "@/providers/LoaderProvider";

interface ProfileCoverProps {
  user: UserType;
  fetchUser?: () => Promise<{}>;
}

export default function ProfileCover({ user, fetchUser }: ProfileCoverProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const loader = useLoading();

  const triggerFileInput = () => {
    if (!fetchUser) {
      return;
    }
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const triggerFileInput2 = () => {
    if (!fetchUser) {
      return;
    }
    if (fileInputRef2.current) {
      fileInputRef2.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "profileCoverUrl" | "profilePicUrl"
  ) => {
    try {
      loader?.setLoading(true);
      if (event.target.files) {
        const file = event.target.files[0];

        if (file) {
          const newFormData = new FormData();
          newFormData.append(type, file);
          const res = await updateUser(newFormData);
          if (res.success && fetchUser) {
            await fetchUser();
          }
        }
      }
      if (type === "profileCoverUrl") {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        if (fileInputRef2.current) {
          fileInputRef2.current.value = "";
        }
      }
    } catch (error) {
      errorAxios(error);
    } finally {
      loader?.setLoading(false);
    }
  };

  if (!user) {
    return;
  }

  return (
    <div className="bg-secondary relative h-[200px] w-auto">
      <div>
        {user?.profileCoverUrl?.pictureUrl ? (
          <Image
            src={user.profileCoverUrl?.pictureUrl}
            alt="profile-cover"
            fill
            sizes="200"
            priority
            className="absolute top-0 left-0 object-fill aspect-video"
          />
        ) : (
          <div className="h-full w-auto bg-secondary"></div>
        )}
      </div>
      <div className="z-10 flex flex-col items-center relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={(event) => handleFileChange(event, "profileCoverUrl")}
        />
        {fetchUser && (
          <button
            className="flex flex-col items-center justify-center hover:text-primary cursor-pointer"
            type="button"
            onClick={triggerFileInput}
          >
            <Camera size={20} />
            <span className="text-xs font-semibold">
              {user?.profileCoverUrl?.pictureUrl ? "Edit Photo" : "Add Photo"}
            </span>
          </button>
        )}
      </div>

      {/* Profile Header */}
      <div className="absolute bottom-0 left-6 translate-y-[50%] w-full">
        <div className="flex items-center gap-3">
          <input
            className="hidden"
            type="file"
            accept="image/*"
            ref={fileInputRef2}
            onChange={(event) => handleFileChange(event, "profilePicUrl")}
          />
          <Avatar
            onClick={triggerFileInput2}
            className={`size-15 border-2 border-primary ${
              fetchUser && "cursor-pointer"
            }`}
          >
            <AvatarImage src={user?.profilePicUrl?.pictureUrl}></AvatarImage>
            <AvatarFallback>
              {genAbbration(user?.firstName, user?.surname)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col ">
            <div className="backdrop-blur-md backdrop-contrast-125 bg-white/20 text-white px-2 rounded-xl shadow-sm">
              <span
                className="text-primary dark:text-white font-extrabold"
                // style={{ WebkitTextStroke: "0.1px white" }}
              >
                {user?.firstName + " " + user?.surname}
              </span>
            </div>
            <div className="text-xs font-semibold text-foreground">
              {user?.username && "@" + user?.username}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
