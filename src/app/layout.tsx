import type { Metadata } from "next";
import { Providers } from "./providers";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
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
      <body
        className={`${poppins.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
