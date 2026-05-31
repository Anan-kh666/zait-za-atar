import Link from "next/link";
import { type Locale } from "@/i18n/config";
import { type Dictionary } from "@/i18n/get-dictionary";

export function Hero({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary["hero"];
}) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(110%_70%_at_100%_0%,rgba(194,151,77,0.16),transparent_55%)]" />
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-start text-sm font-medium uppercase tracking-[0.25em] text-brass">
            {dict.eyebrow}
          </p>
          <h1 className="mt-6 text-start font-display text-hero font-medium tracking-tight text-ink">
            {dict.title}
          </h1>
          <p className="mt-6 max-w-xl text-start text-lg leading-relaxed text-muted">
            {dict.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={`/${lang}#location`}
              className="rounded-full bg-brass px-7 py-3.5 text-sm font-medium text-ink transition hover:brightness-95"
            >
              {dict.ctaPrimary}
            </Link>
            <Link
              href={`/${lang}#menu`}
              className="rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium text-ink transition hover:border-ink/50"
            >
              {dict.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}