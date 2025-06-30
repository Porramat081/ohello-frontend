"use client";
import { getFriendById } from "@/apis/friend";
import BioComponent from "@/components/BioComponent";
import { Button } from "@/components/Button";
import PostCard from "@/components/PostCard";
import ProfileCover from "@/components/ProfileCover";
import { Separator } from "@/components/Separator";
import { errorAxios } from "@/lib/errorHandle";
import { useLoading } from "@/providers/LoaderProvider";
import { useUser } from "@/providers/UserProvider";
import { UserType } from "@/types/user";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OtherUserPage() {
  const [targetObj, setTargetObj] = useState<
    | (UserType & {
        isYourFriend: boolean;
        friendStatus?: string;
        Posts?: any[];
      })
    | null
  >(null);
  const { slug } = useParams();
  const { user } = useUser();
  const router = useRouter();

  const loader = useLoading();

  const fetchUser = async () => {
    if (user.id === slug) {
      router.replace("/profile");
    }
    try {
      loader?.setLoading(true);
      const res = await getFriendById(slug as string);
      if (!res.success) {
        router.replace("/friend");
        return;
      }
      setTargetObj(() => res.target);
    } catch (error) {
      errorAxios(error);
    } finally {
      loader?.setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchUser();
    }
  }, []);

  if (!targetObj) {
    return;
  }

  return (
    <div>
      <ProfileCover user={targetObj as UserType} />
      <BioComponent bio={targetObj?.bio || ""} isOther={true} />
      <div className="flex justify-center pt-2 px-4">
        <Button className="w-full cursor-pointer dark:text-white">
          {targetObj.friendStatus}
        </Button>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-2">
        {targetObj.Posts && targetObj.Posts.length > 0 ? (
          targetObj.Posts.map((item, index) => (
            <PostCard
              key={index}
              item={item}
              isGuest={!user || user.id !== item.authorId}
            />
          ))
        ) : (
          <div className="flex justify-center pt-2">
            <div>There's no public post</div>
          </div>
        )}
      </div>
    </div>
  );
}
