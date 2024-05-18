import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const switzer = localFont({
  src: "../styles/Switzer-Variable.woff2",
  variable: "--font-switzer",
  weight: "300 900",
  display: "swap",
  style: "normal",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
