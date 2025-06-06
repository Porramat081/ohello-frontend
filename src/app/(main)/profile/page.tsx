"use client";

import BioComponent from "@/components/BioComponent";
import ProfileCover from "@/components/ProfileCover";
import ProfileForm from "@/components/ProfileForm";
import { Separator } from "@/components/Separator";
import { useUser } from "@/providers/UserProvider";

export default function ProfilePage() {
  const imgSrc =
    "https://media.istockphoto.com/id/693307100/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%9E%E0%B8%B7%E0%B9%89%E0%B8%99%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B9%82%E0%B8%9A%E0%B9%80%E0%B8%81%E0%B9%89%E0%B9%83%E0%B8%99%E0%B8%A4%E0%B8%94%E0%B8%B9%E0%B9%83%E0%B8%9A%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%A3%E0%B9%88%E0%B8%A7%E0%B8%87.jpg?s=2048x2048&w=is&k=20&c=KnfmQ-aGy9w0O5bJ2LFTlmZfB-NxLMvzWG1A_chLnTo=";

  const { user } = useUser();

  if (!user) {
    return;
  }

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
