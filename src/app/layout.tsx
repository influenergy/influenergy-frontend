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
  display: "swap",
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
  display: "swap",
});

const catamaran = localFont({
  src: [
    {
      path: "../../public/fonts/Catamaran-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Catamaran-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-catamaran",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Influenergy",
  description:
    "Influenergy is a platform for influencers to connect with brands and monetize their content. We help influencers to grow their audience and make money.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${monaSans.variable} ${catamaran.variable}`}
    >
      <body className={`${poppins.className} font-poppins`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
