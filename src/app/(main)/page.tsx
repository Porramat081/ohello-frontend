import { Button } from "@/components/Button";
import Mainboard from "@/components/MainBoard";
import MenuUser from "@/components/MenuUser";
import MenuUserButton from "@/components/MenuUserButton";
import {
  ChartArea,
  EggFriedIcon,
  Group,
  Home,
  MailOpen,
  MessageCircle,
  User,
  Users,
} from "lucide-react";

export default function MainPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4">
      <div className="flex justify-end border-r pr-1 min-h-svh">
        <MenuUser />
      </div>

      <div className="col-span-2">
        <Mainboard />
      </div>
      <div>thrid</div>
    </div>
  );
}
