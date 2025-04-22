import { LucideIcon } from "lucide-react";
import { Button } from "./Button";

interface MenuUserButtonProps {
  icon: LucideIcon;
  title: string;
  active?: boolean;
}

export default function MenuUserButton({ icon, title }: MenuUserButtonProps) {
  const Icon = icon;
  return (
    <Button
      variant={"ghost"}
      className="text-xs cursor-pointer flex items-center justify-start pl-0 hover:bg-transparent hover:text-primary/50"
    >
      <Icon size={16} />
      <span>{title}</span>
    </Button>
  );
}
