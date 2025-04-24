import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-2 min-w-[500px] mx-auto max-w-[800px] min-h-[600px] rounded-xl overflow-hidden border-2 mt-8">
      <div className="col-span-1 bg-secondary flex flex-col justify-center items-center text-center p-10">
        <h1 className="text-4xl font-bold text-purple-700 mb-6">ohello</h1>
        <div className="w-full h-auto aspect-video relative">
          <Image
            src="/info_1.jpg" // Replace with your SVG/PNG path
            alt="Illustration"
            fill
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

      <div className="col-span-1">{children}</div>
    </div>
  );
}
