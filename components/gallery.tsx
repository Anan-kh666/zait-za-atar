import Image from "next/image";
import { type Dictionary } from "@/i18n/get-dictionary";

const tiles = [
  { src: "/gallery/img-1.jpg", span: "col-span-2 row-span-2" },
  { src: "/gallery/img-2.jpg", span: "col-span-2" },
  { src: "/gallery/img-3.jpg", span: "" },
  { src: "/gallery/img-4.jpg", span: "" },
  { src: "/gallery/img-5.jpg", span: "col-span-2" },
  { src: "/gallery/img-6.jpg", span: "col-span-2" },
];

export function Gallery({ dict }: { dict: Dictionary["gallery"] }) {
  return (
    <section id="gallery" className="scroll-mt-24 bg-sand/40 py-24">
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

        <div className="mt-12 grid auto-rows-[140px] grid-cols-2 gap-3 lg:auto-rows-[180px] lg:grid-cols-4">
          {tiles.map((t, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-xl ${t.span}`}
            >
              <Image
                src={t.src}
                alt="Zait & Za'atar"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}