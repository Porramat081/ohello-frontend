"use client";

import { userSignOut } from "@/apis/user";
import { useLoading } from "@/providers/LoaderProvider";
import { useUser } from "@/providers/UserProvider";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeaderBtn() {
  const [isDark, setIsDark] = useState(false);
  const { theme, setTheme } = useTheme();
  const handleToggle = () => {
    setIsDark((prev) => !prev);
  };
  const router = useRouter();
  const { user, fetchUser } = useUser();
  const loader = useLoading();

  const handleClickUserBtn = async () => {
    if (!user) {
      loader?.setLoading(true);
      router.push("/auth/signin");
      return;
    }
    try {
      loader?.setLoading(true);
      await userSignOut();
      await fetchUser();
      return;
    } finally {
      loader?.setLoading(false);
    }
  };

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className="absolute right-3 flex items-center flex-row-reverse gap-4">
      <button
        onClick={handleToggle}
        className={`w-10 h-6 flex items-center rounded-full py-1 transition-colors duration-500 ease-in-out ${
          isDark ? "bg-black" : "bg-gray-300"
        }`}
      >
        <div
          className={`size-5 flex items-center justify-center text-black bg-white rounded-full shadow-md transform transition-transform duration-500 ease-in-out ${
            isDark ? "translate-x-5" : "translate-x-0"
          }`}
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </div>
      </button>

      {/* Mobile user menu */}
      <button
        className="text-white hover:text-muted-foreground hover:underline cursor-pointer"
        onClick={handleClickUserBtn}
      >
        {user ? "sign out" : "sign in"}
      </button>
    </div>
  );
}
