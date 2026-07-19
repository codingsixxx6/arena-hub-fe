import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import AuthInitializer from "@/providers/AuthInitializer";

import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ArenaHub",
    template: "%s | ArenaHub",
  },
  description:
    "ArenaHub is an online sports venue booking platform that helps players discover and book courts quickly and easily.",
  keywords: [
    "ArenaHub",
    "Sports Booking",
    "Court Booking",
    "Padel",
    "Badminton",
    "Futsal",
    "Basketball",
    "Tennis",
  ],
  applicationName: "ArenaHub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-slate-950 text-white">
        <TanstackQueryProvider>
          <AuthInitializer>
            {children}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              theme="dark"
            />
          </AuthInitializer>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}