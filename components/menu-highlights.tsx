import { type Dictionary } from "@/i18n/get-dictionary";

export function MenuHighlights({ dict }: { dict: Dictionary["menu"] }) {
  return (
    <section id="menu" className="scroll-mt-24 bg-sand/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-start text-sm font-medium uppercase tracking-[0.25em] text-brass">
            {dict.eyebrow}
          </p>
          <h2 className="mt-4 text-start font-display text-display font-medium tracking-tight text-ink">
            {dict.title}
          </h2>
          <p className="mt-4 text-start text-muted">{dict.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {dict.items.map((item) => (
            <div
              key={item.name}
              className="flex items-baseline justify-between gap-4 border-b border-border pb-5"
            >
              <div className="text-start">
                <h3 className="font-display text-2xl font-medium text-ink">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
              <span className="shrink-0 font-display text-xl text-brass">
                {dict.currency} {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}