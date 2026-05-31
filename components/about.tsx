import { type Dictionary } from "@/i18n/get-dictionary";

export function About({ dict }: { dict: Dictionary["about"] }) {
  return (
    <section id="about" className="scroll-mt-24 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        <div className="text-start">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-brass">
            {dict.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-display font-medium leading-tight tracking-tight text-ink">
            {dict.title}
          </h2>
          <div className="mt-6 space-y-4 text-muted">
            {dict.paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>

        <figure className="rounded-2xl bg-olive-deep px-10 py-14 text-cream">
          <span className="font-display text-6xl leading-none text-brass">”</span>
          <blockquote className="mt-2 text-start font-display text-3xl leading-snug">
            {dict.quote}
          </blockquote>
          <figcaption className="mt-6 text-start text-sm uppercase tracking-[0.2em] text-brass">
            — {dict.quoteAuthor}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}