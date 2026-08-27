"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

/** How far down the page the wordmark starts fading in. */
const THRESHOLD = 16;

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const getSnapshot = () => window.scrollY > THRESHOLD;
const getServerSnapshot = () => false;

/**
 * The banner wordmark stays out of the way at the top of a page, where the
 * page's own heading is already on screen, and fades in once you scroll.
 */
export default function BannerBrand() {
  const scrolled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <Link
      href="/"
      aria-hidden={!scrolled}
      tabIndex={scrolled ? undefined : -1}
      className={`text-3xl font-bold tracking-tight text-white transition-all duration-300 sm:text-4xl ${
        scrolled ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
      }`}
    >
      <span className="text-gold">Monstra</span>
    </Link>
  );
}
