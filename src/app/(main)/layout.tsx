import Mainboard from "@/components/MainBoard";
import MenuUser from "@/components/MenuUser";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4">
      <div className="flex justify-end border-r pr-3 min-h-svh">
        <MenuUser />
      </div>

      <div className="col-span-2">{children}</div>
      <div>thrid</div>
    </div>
  );
}
