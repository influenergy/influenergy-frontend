// app/fonts.ts (or wherever you import fonts)
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

// Google Font - Poppins
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// Local Font - Mona Sans
export const monaSans = localFont({
  src: [
    {
      path: "./fonts/mona-sans/MonaSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-mona-sans",
  display: "swap",
});

// Local Font - Catamaran (fixed folder and name)
export const catamaran = localFont({
  src: [
    {
      path: "./fonts/catarmarn/Catamaran-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/catarmarn/Catamaran-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-catamaran",
  display: "swap",
});


export const nirmala = localFont({
  src: [
    {
      path: "./fonts/nirmala/nirmalab.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nirmala",
  display: "swap",
});