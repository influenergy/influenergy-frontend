import type { Metadata } from "next";
import { Providers } from "./providers";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "700", "800"],
  variable: "--font-poppins",
});
const monaSans = localFont({
  src: [
    {
      path: "../../public/fonts/MonaSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-mona-sans",
});

export const metadata: Metadata = {
  title: "Influenergy Demo",
  description: "A modern authentication system built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${monaSans.variable}`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
