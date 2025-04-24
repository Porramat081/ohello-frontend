import { LucideIcon } from "lucide-react";
import { Button } from "./Button";
import Link from "next/link";

interface MenuUserButtonProps {
  icon: LucideIcon;
  title: string;
  active?: boolean;
  href: string;
}

export default function MenuUserButton({
  icon,
  title,
  href,
}: MenuUserButtonProps) {
  const Icon = icon;
  return (
    <Link
      href={href}
      className="text-xs font-semibold gap-1.5 cursor-pointer flex items-center justify-start hover:bg-transparent hover:text-primary/50"
    >
      <Icon size={16} />
      <span>{title}</span>
    </Link>
  );
}
