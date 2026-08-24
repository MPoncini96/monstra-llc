import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Future Projects — Matthew Poncini",
  description: "Projects in progress across the Monstra network.",
};

const futureProjects = [
  {
    label: "Monstra.guide",
    href: "https://monstra.guide",
    icon: "🧭",
    tag: "Resources",
    blurb: "A guided resource hub for navigating the tools and workflows in the Monstra network.",
  },
  {
    label: "Monstra.study",
    href: "https://monstra.study",
    icon: "📚",
    tag: "Learning",
    blurb: "Learning surfaces for mathematics, statistics, and applied machine learning.",
  },
];

export default function FutureProjects() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500 transition-colors hover:text-purple-400"
        >
          <span aria-hidden>←</span> Back to portfolio
        </Link>

        <header className="mt-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Future{" "}
            <span className="bg-gradient-to-br from-violet-500 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            Work in progress across the Monstra network — early builds and ideas that are still
            taking shape.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {futureProjects.map(({ label, href, icon, tag, blurb }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-7 transition-all duration-200 hover:-translate-y-1 hover:border-purple-500/40 hover:bg-white/[0.06] hover:shadow-[0_12px_40px_rgba(124,58,237,0.18)]"
            >
              <span className="text-3xl">{icon}</span>
              <div>
                <span className="text-base font-semibold text-gray-100">{label}</span>
                <span className="ml-2 text-[11px] uppercase tracking-widest text-purple-400/70">
                  {tag}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">{blurb}</p>
            </a>
          ))}
        </div>

        <footer className="mt-16 border-t border-white/10 pt-6 text-center text-xs tracking-wide text-gray-700">
          © {new Date().getFullYear()} Monstra LLC
        </footer>
      </div>
    </main>
  );
}
