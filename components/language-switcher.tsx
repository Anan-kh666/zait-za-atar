"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale } from "@/i18n/config";

export function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const other: Locale = lang === "ar" ? "en" : "ar";

  // pathname always starts with "/<locale>" thanks to the middleware
  const segments = pathname.split("/");
  segments[1] = other;
  const href = segments.join("/") || `/${other}`;

  return (
    <Link
      href={href}
      hrefLang={other}
      className="text-sm font-medium text-ink/70 transition hover:text-ink"
    >
      {other === "ar" ? "العربية" : "EN"}
    </Link>
  );
}