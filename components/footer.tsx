import Link from "next/link";
import { type Locale } from "@/i18n/config";
import { type Dictionary } from "@/i18n/get-dictionary";

export function Footer({
  lang,
  nav,
  dict,
}: {
  lang: Locale;
  nav: Dictionary["nav"];
  dict: Dictionary["footer"];
}) {
  const year = new Date().getFullYear();
  const links = [
    { href: `/${lang}#menu`, label: nav.menu },
    { href: `/${lang}#about`, label: nav.about },
    { href: `/${lang}#gallery`, label: nav.gallery },
    { href: `/${lang}#location`, label: nav.location },
  ];

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm text-start">
            <p className="font-display text-3xl font-medium">
              {lang === "ar" ? "زيت وزعتر" : "Zait & Za'atar"}
            </p>
            <p className="mt-3 text-sm text-cream/70">{dict.tagline}</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-cream/80 transition hover:text-brass"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-12 border-t border-cream/15 pt-6 text-start text-xs text-cream/50">
          © {year} Zait & Za'atar. {dict.rights}
        </div>
      </div>
    </footer>
  );
}