import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Future Projects — Monstra, LLC",
  description: "Projects in progress across the Monstra network.",
};

const futureProjects = [
  {
    label: "Monstra.study",
    href: "https://monstra.study",
    icon: "📚",
    tag: "Learning",
    blurb:
      "Learning surfaces for mathematics, statistics, and applied machine learning, built on the teaching approach behind the rest of the network. Still in development — the domain is not serving yet.",
  },
];

export default function FutureProjects() {
  return (
    <main className="min-h-screen bg-ink px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-parchment/50 transition-colors hover:text-gold"
        >
          <span aria-hidden>←</span> Back to Monstra
        </Link>

        <header className="mt-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Future <span className="text-gold">Projects</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-parchment/70">
            Work in progress across the Monstra network — early builds and ideas that are still
            taking shape.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-4">
          {futureProjects.map(({ label, href, icon, tag, blurb }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-2xl border border-purple-mid/40 bg-surface px-6 py-7 transition-all duration-200 hover:-translate-y-1 hover:border-gold/60 hover:bg-surface-2 hover:shadow-[0_12px_40px_rgba(42,18,80,0.7)]"
            >
              <span className="text-3xl">{icon}</span>
              <div>
                <span className="text-base font-semibold text-parchment">{label}</span>
                <span className="ml-2 text-[11px] uppercase tracking-widest text-gold-soft/80">
                  {tag}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-parchment/70">{blurb}</p>
            </a>
          ))}
        </div>

        <footer className="mt-16 border-t border-purple-mid/40 pt-6 text-center text-xs tracking-wide text-parchment/35">
          © {new Date().getFullYear()} Monstra LLC
        </footer>
      </div>
    </main>
  );
}
