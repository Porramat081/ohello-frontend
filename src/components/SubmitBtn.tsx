import { Loader2, LucideIcon } from "lucide-react";
import { Button } from "./Button";

interface SubmitBtnProps {
  name: string;
  pending?: boolean;
  icon?: LucideIcon;
  addclassname?: string;
}

export default function SubmitBtn({
  name,
  pending = false,
  icon,
  ...props
}: SubmitBtnProps) {
  const Icon = icon;
  return (
    <Button
      disabled={pending}
      type="submit"
      className={`cursor-pointer ${props.addclassname || ""}`}
      {...props}
    >
      {pending ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <>{Icon && <Icon size={16} />}</>
      )}
      {name}
    </Button>
  );
}
