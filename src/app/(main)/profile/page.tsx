"use client";

import BioComponent from "@/components/BioComponent";
import ProfileCover from "@/components/ProfileCover";
import ProfileForm from "@/components/ProfileForm";
import { Separator } from "@/components/Separator";
import { useUser } from "@/providers/UserProvider";

export default function ProfilePage() {
  const { user, fetchUser } = useUser();

  if (!user) {
    return;
  }

  return (
    <div>
      {/* Profile Cover */}
      <ProfileCover
        user={{
          ...user,
          profilePicUrl: { pictureUrl: user.profilePicUrl },
          profileCoverUrl: { pictureUrl: user.profileCoverUrl },
        }}
        fetchUser={fetchUser}
      />
      {/* Bio */}
      <BioComponent bio={user.bio} fetchUser={fetchUser} />
      <Separator className="my-5" />
      <ProfileForm user={user} />
    </div>
  );
}
