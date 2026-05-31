import Link from "next/link";
import { type Locale } from "@/i18n/config";
import { type Dictionary } from "@/i18n/get-dictionary";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Navbar({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary["nav"];
}) {
  const links = [
    { href: `/${lang}#menu`, label: dict.menu },
    { href: `/${lang}#about`, label: dict.about },
    { href: `/${lang}#gallery`, label: dict.gallery },
    { href: `/${lang}#location`, label: dict.location },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-20 bg-ink/90 backdrop-blur-md border-b border-cream/10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href={`/${lang}`}
          className="font-display text-2xl font-medium text-cream"
        >
          {lang === "ar" ? "زيت وزعتر" : "Zait & Za'atar"}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-cream/65 transition hover:text-cream"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher lang={lang} />
          <Link
            href={`/${lang}#location`}
            className="rounded-full bg-brass px-5 py-2.5 text-sm font-medium text-ink transition hover:brightness-110"
          >
            {dict.reserve}
          </Link>
        </div>
      </nav>
    </header>
  );
}