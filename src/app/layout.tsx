import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/Toaster";
import { ThemeProvider } from "@/components/theme-provider";

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
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
