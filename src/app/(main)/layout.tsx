"use client";

import MenuUser from "@/components/MenuUser";
import NotifyBox from "@/components/notifyBox";
import { useUser } from "@/providers/UserProvider";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, fetchUser } = useUser();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="relative min-h-svh md:max-w-[760px] lg:max-w-[1000px] xl:max-w-[1200px] grid grid-cols-1 sm:grid-cols-8 lg:grid-cols-9 mx-auto">
      <div className="hidden sm:flex justify-start border-r pr-3 px-2 xl:px-0 col-span-2 lg:col-span-2">
        {user && user.status === "Active" && <MenuUser user={user} />}
      </div>
      <div
        className={`${
          user && user.status === "Active"
            ? "col-span-4 lg:col-span-5"
            : "col-span-6 col-start-2 border-l border-r"
        } h-screen overflow-auto hide-scrollbar`}
      >
        {children}
      </div>
      <div
        className={`hidden sm:flex justify-center border-l pt-3 px-2 col-span-2 lg:col-span-2`}
      >
        {user && user.status === "Active" && <NotifyBox />}
      </div>
    </div>
  );
}
