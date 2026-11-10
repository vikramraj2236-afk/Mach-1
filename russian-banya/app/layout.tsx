import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", weight: ["400", "500", "600", "700"] });
const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Russian Banya | The Art of Russian Wellness",
  description: "A considered ritual of heat, renewal and stillness. Discover the Russian Banya wellness experience.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Russian Banya — Experience The Art of Russian Wellness",
    description: "Ancient ritual. Modern restoration.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>;
}
