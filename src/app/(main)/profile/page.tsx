"use client";

import BioComponent from "@/components/BioComponent";
import ProfileCover from "@/components/ProfileCover";
import ProfileForm from "@/components/ProfileForm";
import { Separator } from "@/components/Separator";
import { useUser } from "@/providers/UserProvider";

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return;
  }

  return (
    <div>
      {/* Profile Cover */}
      <ProfileCover imgSrc={user.profileCoverUrl} />
      {/* Bio */}
      <BioComponent />
      <Separator className="my-5" />
      <ProfileForm />
    </div>
  );
}
