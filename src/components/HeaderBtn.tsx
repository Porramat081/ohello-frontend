"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function HeaderBtn() {
  const [isDark, setIsDark] = useState(false);
  const { theme, setTheme } = useTheme();
  const handleToggle = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark]);
  return (
    <div className="absolute right-3 flex items-center gap-2">
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
      <div></div>
    </div>
  );
}
