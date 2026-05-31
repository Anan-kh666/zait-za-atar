import Link from "next/link";
import { type Locale } from "@/i18n/config";
import { type Dictionary } from "@/i18n/get-dictionary";

function HeroOrnament() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full"
    >
      {/* Outer group — rotates slowly clockwise */}
      <g className="spin-slow">
        {/* Outermost ring */}
        <circle cx="200" cy="200" r="193" stroke="currentColor" strokeWidth="1" strokeOpacity="0.28" />
        {/* 8 tick marks at cardinal + diagonal positions */}
        <line x1="200" y1="7"   x2="200" y2="38"  stroke="currentColor" strokeWidth="2" strokeOpacity="0.55" />
        <line x1="200" y1="362" x2="200" y2="393" stroke="currentColor" strokeWidth="2" strokeOpacity="0.55" />
        <line x1="7"   y1="200" x2="38"  y2="200" stroke="currentColor" strokeWidth="2" strokeOpacity="0.55" />
        <line x1="362" y1="200" x2="393" y2="200" stroke="currentColor" strokeWidth="2" strokeOpacity="0.55" />
        <line x1="63"  y1="63"  x2="85"  y2="85"  stroke="currentColor" strokeWidth="2" strokeOpacity="0.55" />
        <line x1="337" y1="63"  x2="315" y2="85"  stroke="currentColor" strokeWidth="2" strokeOpacity="0.55" />
        <line x1="337" y1="337" x2="315" y2="315" stroke="currentColor" strokeWidth="2" strokeOpacity="0.55" />
        <line x1="63"  y1="337" x2="85"  y2="315" stroke="currentColor" strokeWidth="2" strokeOpacity="0.55" />
        {/* Second ring */}
        <circle cx="200" cy="200" r="158" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.14" />
        {/* Outer 8-pointed star — two overlapping diamonds, second rotated 45° */}
        <polygon
          points="200,50 350,200 200,350 50,200"
          stroke="currentColor" strokeWidth="1" strokeOpacity="0.2"
        />
        <polygon
          points="200,50 350,200 200,350 50,200"
          stroke="currentColor" strokeWidth="1" strokeOpacity="0.16"
          transform="rotate(45,200,200)"
        />
      </g>

      {/* Inner group — counter-rotates */}
      <g className="spin-counter">
        <circle cx="200" cy="200" r="90" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.22" />
        <polygon
          points="200,130 270,200 200,270 130,200"
          stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.2"
        />
        <polygon
          points="200,130 270,200 200,270 130,200"
          stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.16"
          transform="rotate(45,200,200)"
        />
      </g>

      {/* Static center */}
      <circle cx="200" cy="200" r="22" stroke="currentColor" strokeWidth="1"   strokeOpacity="0.3" />
      <circle cx="200" cy="200" r="5"  fill="currentColor"   fillOpacity="0.5" />
    </svg>
  );
}

export function Hero({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary["hero"];
}) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-ink">
      {/* Atmospheric brass glow — radiates from top */}
      <div className="pointer-events-none absolute inset-0 hero-glow-top" />
      {/* Atmospheric olive glow — radiates from bottom */}
      <div className="pointer-events-none absolute inset-0 hero-glow-bottom" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-8 pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Text column */}
          <div>
            <div className="hero-eyebrow flex items-center gap-3">
              <span className="h-px w-8 shrink-0 bg-brass" />
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-brass">
                {dict.eyebrow}
              </p>
            </div>

            <h1 className="hero-title mt-5 font-display text-hero font-medium leading-none tracking-tight text-cream">
              {dict.title}
            </h1>

            <p className="hero-sub mt-6 max-w-lg text-lg leading-relaxed text-cream/55">
              {dict.subtitle}
            </p>

            <div className="hero-ctas mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={`/${lang}#location`}
                className="rounded-full bg-brass px-7 py-3.5 text-sm font-medium text-ink transition hover:brightness-110"
              >
                {dict.ctaPrimary}
              </Link>
              <Link
                href={`/${lang}#menu`}
                className="rounded-full border border-cream/20 px-7 py-3.5 text-sm font-medium text-cream/75 transition hover:border-cream/45 hover:text-cream"
              >
                {dict.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Ornament column — visible on large screens only */}
          <div className="hero-deco hidden items-center justify-center lg:flex">
            <div className="aspect-square w-full max-w-[460px] text-brass">
              <HeroOrnament />
            </div>
          </div>

        </div>
      </div>

      {/* Thin brass hairline above the bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-32 h-px bg-gradient-to-r from-transparent via-brass/20 to-transparent" />
      {/* Bottom fade — smoothly transitions into the cream page background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 hero-fade-bottom" />
    </section>
  );
}
