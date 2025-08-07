import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/Toaster";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/theme-provider";
import Logo from "@/components/Logo";
import HeaderBtn from "@/components/HeaderBtn";
import { UserProvider } from "@/providers/UserProvider";
import { LoaderProvider } from "@/providers/LoaderProvider";
import { NotifyProvider } from "@/providers/NotifyProvider";

export const metadata: Metadata = {
  title: {
    default: "Ohello | Social Media",
    template: "%s | Ohello",
  },
  description:
    "Ohello is a social media platform that connects you with your friends and family.",
  keywords: [
    "Ohello",
    "social media",
    "connect",
    "friends",
    "family",
    "community",
    "share",
    "photos",
    "messages",
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NotifyProvider>
            <LoaderProvider>
              <UserProvider>
                <div className="min-h-svh antialiased relative min-w-[300px]">
                  <div className="py-2 flex justify-between pl-3 sm:pl-0 sm:justify-center items-center bg-primary sticky top-0 left-0 w-full z-30">
                    <Logo />
                    <HeaderBtn />
                  </div>
                  {children}
                </div>

                <Toaster />
                <ToastContainer />
              </UserProvider>
            </LoaderProvider>
          </NotifyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
