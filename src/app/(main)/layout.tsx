import Logo from "@/components/Logo";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh flex flex-col antialiased">
      <div className="py-1 flex justify-center items-center bg-foreground">
        <Logo />
      </div>
      {children}
    </div>
  );
}
