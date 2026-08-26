import type { Metadata } from "next";
import Link from "next/link";
import TspVisualizer from "./TspVisualizer";

export const metadata: Metadata = {
  title: "TSP Visualizer | Matthew Poncini",
  description:
    "An interactive walkthrough of four ways to attack the traveling salesman problem, drawn from two University of Louisville papers.",
};

const papers = [
  {
    label: "GA + Wisdom of Crowds for TSP",
    href: "/academic/tsp-ga-wisdom-of-crowds.pdf",
  },
  {
    label: "Simulated Annealing & Niching GAs for Bottleneck TSP",
    href: "/academic/bottleneck-tsp-sa-niching-ga.pdf",
  },
];

export default function TspPage() {
  return (
    <main className="min-h-screen bg-ink px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/MatthewPoncini"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-parchment/50 transition-colors hover:text-gold"
        >
          <span aria-hidden>←</span> Back to portfolio
        </Link>

        <header className="mt-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            TSP <span className="text-gold">Visualizer</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-parchment/70">
            The traveling salesman problem asks for the shortest closed tour through every city.
            It is NP-hard, so past a handful of cities nobody checks every tour. Instead you pick
            a strategy for searching well. Below are four strategies from two of my papers, running
            live in your browser. Pick a method, press Run, and watch how it searches.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {papers.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-purple-mid/50 bg-surface px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-parchment transition-all duration-200 hover:border-gold/60 hover:bg-surface-2 hover:text-gold"
              >
                {label}
              </a>
            ))}
          </div>
        </header>

        <section className="mt-12">
          <TspVisualizer />
        </section>

        <section className="mt-12 rounded-2xl border border-purple-mid/40 bg-surface p-5">
          <h2 className="text-sm font-semibold text-white">What to look for</h2>
          <ul className="mt-3 space-y-2">
            {[
              "Nearest Neighbor finishes instantly but leaves one long edge stranded at the end, because it never reconsiders an early choice.",
              "Simulated Annealing looks chaotic at first. That is deliberate: a high temperature accepts worse tours so it can cross valleys, and the tour only settles as it cools.",
              "The plain Genetic Algorithm improves in visible jumps as a better tour takes over the population, then stalls once diversity is gone.",
              "GA + Wisdom of Crowds usually locks in the obvious edges sooner, because offspring inherit whatever the whole leading group agrees on rather than just two parents.",
              "Switch the objective to the longest edge and the winning tour changes shape, happily adding total distance to shorten its single worst hop.",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-sm leading-relaxed text-parchment/70">
                <span
                  aria-hidden
                  className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold"
                />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-parchment/50">
            This is a teaching model, not the code from the papers. It runs entirely client-side at
            a smaller scale, so the tuning is lighter than the experiments the papers report.
          </p>
        </section>

        <footer className="mt-16 border-t border-purple-mid/40 pt-6 text-center text-xs tracking-wide text-parchment/35">
          © {new Date().getFullYear()} Monstra LLC
        </footer>
      </div>
    </main>
  );
}
