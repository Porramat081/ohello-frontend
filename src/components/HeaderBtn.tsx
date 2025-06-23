"use client";

import { userSignOut } from "@/apis/user";
import { errorAxios } from "@/lib/errorHandle";
import { useLoading } from "@/providers/LoaderProvider";
import { useUser } from "@/providers/UserProvider";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./Button";

export default function HeaderBtn() {
  const [isDark, setIsDark] = useState(false);
  const { theme, setTheme } = useTheme();
  const handleToggle = () => {
    setIsDark((prev) => !prev);
  };
  const router = useRouter();
  const pathname = usePathname();
  const { user, clearUser } = useUser();
  const loader = useLoading();

  const handleClickUserBtn = async () => {
    try {
      loader?.setLoading(true);
      if (!user) {
        router.push("/auth/signin");
        return;
      } else {
        await userSignOut();
        clearUser();
        router.replace("/auth/signin");
        return;
      }
    } catch (error) {
      errorAxios(error);
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
      {pathname === "/auth/signin" ? (
        <button
          onClick={() => {
            loader?.setLoading(true);
            router.replace("/");
          }}
          className="text-white hover:text-muted-foreground hover:underline cursor-pointer"
        >
          go to page
        </button>
      ) : (
        <Button
          className="text-white hover:text-muted-foreground hover:underline cursor-pointer"
          onClick={handleClickUserBtn}
        >
          {user ? "sign out" : "sign in"}
        </Button>
      )}

      {user && user.status === "Pending" && (
        <button
          onClick={() => {
            loader?.setLoading(true);
            router.replace("/verify");
          }}
          className="text-white hover:text-muted-foreground hover:underline cursor-pointer"
        >
          verify
        </button>
      )}
    </div>
  );
}
