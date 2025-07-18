import type { Metadata } from "next";
import { Providers } from "./providers";
import { poppins, monaSans, catamaran, nirmala } from "./fonts";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Influenergy - AI-Powered Influencer Marketing Connecting Brands With Creators",
  description:
    "Influenergy is a platform for Influencers to connect with brands and monetize their content. We help Influencers to grow their audience and make money.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${monaSans.variable} ${catamaran.variable} ${nirmala.variable}`}
    >
      <body className={`${poppins.className} font-poppins`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
