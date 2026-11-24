"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";

/**
 * Horizontally scrollable row of cards. Swipe or trackpad-scroll to move;
 * the arrow buttons step one card at a time and hide at either end.
 */
export default function ProjectCarousel({ children }: { children: React.ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const step = (direction: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const arrow =
    "absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 bg-purple-deep/95 text-lg text-gold shadow-lg transition-opacity hover:bg-surface-2 sm:flex";

  return (
    <div className="relative">
      <div
        ref={track}
        onScroll={update}
        className="carousel-track -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 sm:mx-0 sm:scroll-px-0 sm:px-0"
        aria-label="Projects"
        role="region"
        tabIndex={0}
      >
        {Children.map(children, (child) => (
          <div className="w-[85%] max-w-sm shrink-0 snap-start sm:w-[340px]">{child}</div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous project"
        onClick={() => step(-1)}
        className={`${arrow} -left-5 ${atStart ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next project"
        onClick={() => step(1)}
        className={`${arrow} -right-5 ${atEnd ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        ›
      </button>
    </div>
  );
}
