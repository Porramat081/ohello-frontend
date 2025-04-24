"use client";

import BioComponent from "@/components/BioComponent";
import ProfileCover from "@/components/ProfileCover";
import ProfileForm from "@/components/ProfileForm";
import { Separator } from "@/components/Separator";

export default function ProfilePage() {
  const imgSrc = "/info_1.jpg";

  return (
    <div>
      {/* Profile Cover */}
      <ProfileCover imgSrc={imgSrc} />
      {/* Bio */}
      <BioComponent />
      <Separator className="my-5" />
      <ProfileForm />
    </div>
  );
}
