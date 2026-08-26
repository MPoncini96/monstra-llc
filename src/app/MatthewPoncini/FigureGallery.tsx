"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type Figure = { src: string; caption: string };

export default function FigureGallery({
  figures,
  label,
}: {
  figures: Figure[];
  label: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) =>
      setOpen((i) => (i === null ? i : (i + d + figures.length) % figures.length)),
    [figures.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  return (
    <>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {figures.map((fig, i) => (
          <li key={fig.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group w-full cursor-zoom-in text-left"
              aria-label={`Enlarge figure: ${fig.caption}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-purple-mid/50 bg-white p-1.5 transition-all duration-200 group-hover:border-gold/60">
                <Image
                  src={fig.src}
                  alt={fig.caption}
                  fill
                  sizes="(min-width: 640px) 15rem, 45vw"
                  className="object-contain p-1"
                />
              </div>
              <p className="mt-1.5 text-[11px] leading-snug text-parchment/60 transition-colors duration-200 group-hover:text-gold-soft">
                {fig.caption}
              </p>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${label}: figure viewer`}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-5xl flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                {label}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close figure viewer"
                className="shrink-0 rounded-full border border-purple-mid/60 bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-widest text-parchment transition-colors hover:border-gold/60 hover:text-gold"
              >
                Close
              </button>
            </div>

            <div className="relative h-[68vh] w-full overflow-hidden rounded-xl border border-gold/40 bg-white p-3">
              <Image
                src={figures[open].src}
                alt={figures[open].caption}
                fill
                sizes="90vw"
                className="object-contain p-2"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <p className="text-sm leading-relaxed text-parchment/80">
                {figures[open].caption}
              </p>
              {figures.length > 1 && (
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous figure"
                    className="rounded-full border border-purple-mid/60 bg-surface px-3 py-1 text-xs font-semibold text-parchment transition-colors hover:border-gold/60 hover:text-gold"
                  >
                    ←
                  </button>
                  <span className="self-center text-[11px] tracking-widest text-parchment/50">
                    {open + 1} / {figures.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next figure"
                    className="rounded-full border border-purple-mid/60 bg-surface px-3 py-1 text-xs font-semibold text-parchment transition-colors hover:border-gold/60 hover:text-gold"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
