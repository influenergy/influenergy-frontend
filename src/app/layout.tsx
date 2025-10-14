import type { Metadata } from "next";
import { Providers } from "./providers";
import { poppins, monaSans, catamaran, nirmala } from "./fonts";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import GoogleProvider from "./GoogleProvider";
import Script from "next/script";
import NetworkWatcher from "@/components/NetworkWatcher";


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
      <head>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </head>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />

      <body className={`${poppins.className} font-poppins`}>
        <Providers>
          <GoogleProvider>
            <NetworkWatcher />
            {children}
          </GoogleProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
