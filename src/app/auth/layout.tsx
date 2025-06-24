"use client";

import { useUser } from "@/providers/UserProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mx-auto min-h-[600px] rounded-xl overflow-hidden border-2 mt-8 max-w-3xl">
      <div className="col-span-1 bg-secondary flex flex-col justify-center items-center text-center p-10">
        <h1 className="text-4xl font-bold text-purple-700 mb-6">ohello</h1>
        <div className="w-full h-auto aspect-video relative hidden md:block">
          <Image
            src="/info_1.jpg" // Replace with your SVG/PNG path
            alt="Illustration"
            fill
            sizes=""
            className="absolute"
          />
        </div>
        <p className="text-xl font-semibold mb-4 mt-4">
          Create an account and start your journey!
        </p>
        <ul className="text-left space-y-2 text-lg text-purple-900">
          <li>💬 Real-time chat</li>
          <li>📝 Post & comment</li>
          <li>🔍 Find friends</li>
        </ul>
      </div>

      <div className="col-span-1 order-first md:order-last">{children}</div>
    </div>
  );
}
