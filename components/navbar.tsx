import Link from "next/link";
import { type Locale } from "@/i18n/config";
import { type Dictionary } from "@/i18n/get-dictionary";

export function Navbar({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary["nav"];
}) {
  const other = lang === "ar" ? "en" : "ar";
  const links = [
    { href: `/${lang}#menu`, label: dict.menu },
    { href: `/${lang}#about`, label: dict.about },
    { href: `/${lang}#gallery`, label: dict.gallery },
    { href: `/${lang}#location`, label: dict.location },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link
          href={`/${lang}`}
          className="font-display text-2xl font-medium text-ink"
        >
          {lang === "ar" ? "زيت وزعتر" : "Zait & Za'atar"}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-ink/80 transition hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={`/${other}`}
            className="text-sm font-medium text-ink/70 transition hover:text-ink"
          >
            {other === "ar" ? "العربية" : "EN"}
          </Link>
          <Link
            href={`/${lang}#location`}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-olive-deep"
          >
            {dict.reserve}
          </Link>
        </div>
      </nav>
    </header>
  );
}