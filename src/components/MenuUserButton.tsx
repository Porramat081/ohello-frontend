import { LucideProps } from "lucide-react";
import { Button } from "./Button";
import { ForwardRefExoticComponent, RefAttributes, createElement } from "react";

interface MenuUserButtonProps {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  active?: boolean;
}

export default function MenuUserButton({ icon, title }: MenuUserButtonProps) {
  return (
    <Button
      variant={"ghost"}
      className="text-xs cursor-pointer flex items-center justify-start pl-0 hover:bg-transparent hover:text-primary/50"
    >
      {createElement(icon)}
      <span>{title}</span>
    </Button>
  );
}
