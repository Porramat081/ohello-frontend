"use client";

import { Button } from "@/components/Button";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  const { setTheme } = useTheme();

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleClick = () => {
    toast("Hello, world!");
  };

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className="flex items-center justify-center">
      <Button onClick={handleClick}>Test Toast</Button>
      <Button onClick={toggleTheme}>Change Theme</Button>
    </div>
  );
}
