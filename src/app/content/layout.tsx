// app/(dashboard)/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Dashboard | OmniCreate",
//   description: "OmniCreate dashboard for AI-powered content creation",
// };

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white max-h-screen">
      <div>{children}</div>
    </div>
  );
}
