import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
  Aref_Ruqaa,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import "../globals.css";
import { i18n, type Locale } from "@/i18n/config";

const displayLatin = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-latin",
});
const bodyLatin = Inter({
  subsets: ["latin"],
  variable: "--font-body-latin",
});
const displayAr = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-display-ar",
});
const bodyAr = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body-ar",
});

const fontVars = `${displayLatin.variable} ${bodyLatin.variable} ${displayAr.variable} ${bodyAr.variable}`;

export const metadata: Metadata = {
  title: "Zait & Za'atar",
  description: "Levantine dining in Dubai",
};

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir} className={fontVars}>
      <body>{children}</body>
    </html>
  );
}