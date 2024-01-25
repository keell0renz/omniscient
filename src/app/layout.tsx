import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/misc/Theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Cognitar",
  description: "Become omniscient with Omniscient Personal AI-tutoring system.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: "#0284c7",
              colorBackground: "#041220",
            },
          }}
        >
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
            <Toaster />
            <Analytics />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
