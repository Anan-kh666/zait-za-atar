import Link from "next/link";
import { type Locale } from "@/i18n/config";
import { type Dictionary } from "@/i18n/get-dictionary";

export function Location({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary["location"];
}) {
  return (
    <section id="location" className="scroll-mt-24 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-stretch">
        <div className="text-start">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-brass">
            {dict.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-display font-medium tracking-tight text-ink">
            {dict.title}
          </h2>

          <dl className="mt-8 space-y-6">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">
                {dict.addressLabel}
              </dt>
              <dd className="mt-1 text-lg text-ink">{dict.address}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">
                {dict.hoursLabel}
              </dt>
              <dd className="mt-1 space-y-1 text-lg text-ink">
                {dict.hours.map((h, i) => (
                  <p key={i}>{h}</p>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">
                {dict.phoneLabel}
              </dt>
              <dd className="mt-1 text-lg text-ink">{dict.phone}</dd>
            </div>
          </dl>

          <Link
            href={`tel:${dict.phone.replace(/\s/g, "")}`}
            className="mt-8 inline-block rounded-full bg-olive px-7 py-3.5 text-sm font-medium text-cream transition hover:bg-olive-deep"
          >
            {dict.cta}
          </Link>
        </div>

        <div className="min-h-[360px] overflow-hidden rounded-2xl border border-border">
          <iframe
            title="Map"
            src="https://www.google.com/maps?q=City+Walk+Dubai&output=embed"
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}