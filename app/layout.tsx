import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "InvoTracker",
  description: "Invoice Tracker made easy to track, build, and manage invoices to keepyour business organized",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-no-repeat`}
      >
        <div className="bg-gradient-to-br from-[var(--primary-color)] via-[var(--secondary-color)] to-[var(--third-color)] w-full h-full fixed top-0 left-0 z-10"/>
        <main className="z-20 relative">
          {children}
        </main>
        <Toaster richColors position="top-right"/>
      </body>
    </html>
  );
}
