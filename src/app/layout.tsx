import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/Theme-provider';
import { ClerkProvider } from '@clerk/nextjs';

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
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
