import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SWP Shop – Liquid Glass",
  description: "A beautiful Apple-inspired liquid glass online shop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased
          min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950
          text-white font-sans`}
      >
        {/* Background decorative blobs */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-3xl animate-float" />
          <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-3xl animate-float [animation-delay:2s]" />
          <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-3xl animate-float [animation-delay:4s]" />
        </div>

        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
