import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/Toaster";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/theme-provider";
import Logo from "@/components/Logo";

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
          <div className="min-h-svh flex flex-col antialiased">
            <div className="py-2 flex justify-center items-center bg-primary">
              <Logo />
            </div>
            {children}
          </div>
          <Toaster />
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
