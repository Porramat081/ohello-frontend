import Mainboard from "@/components/MainBoard";
import MenuUser from "@/components/MenuUser";
import NotifyBox from "@/components/notifyBox";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-svh md:max-w-[760px] lg:max-w-[1000px] xl:max-w-[1200px] grid grid-cols-1 sm:grid-cols-8 mx-auto">
      <div className="hidden sm:flex justify-start border-r pr-3 px-2 xl:px-0 col-span-2 lg:col-span-1">
        <MenuUser />
      </div>
      <div className="col-span-4 lg:col-span-5 h-screen overflow-auto hide-scrollbar">
        {children}
      </div>
      <div className="hidden sm:flex justify-center border-l pt-3 px-2 col-span-2">
        <NotifyBox />
      </div>
    </div>
  );
}
