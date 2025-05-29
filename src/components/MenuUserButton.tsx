import { useLoading } from "@/providers/LoaderProvider";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const loadingProvider = useLoading();

  const handleClick = () => {
    if (href === pathname) return;
    loadingProvider?.setLoading(true);
  };
  return (
    <Link
      onClick={handleClick}
      href={href}
      className="text-xs font-semibold gap-1.5 cursor-pointer flex items-center justify-start hover:bg-transparent hover:text-primary/50"
    >
      <Icon size={16} />
      <span>{title}</span>
    </Link>
  );
}
