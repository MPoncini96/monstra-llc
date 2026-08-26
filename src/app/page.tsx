import Link from "next/link";

const network = [
  {
    label: "Monstra.bot",
    href: "https://monstra.bot",
    icon: "🤖",
    tagline: "Quantitative research and automation",
    description:
      "The core platform. An end-to-end system for quantitative research and automated trading — data pipelines that turn raw market observations into normalized and clustered features, evaluation infrastructure for comparing models and strategies under explicit information cutoffs, and dashboards for monitoring portfolio state, algorithm behavior, and execution history. Validation runs through broker-executed paper trading, so results come from actual orders, fills, and positions.",
  },
  {
    label: "Monstra.pro",
    href: "https://monstra.pro",
    icon: "⚡",
    tagline: "The Monstra Pro Box",
    description:
      "A dedicated device that runs your Monstra bots locally and trades on your own Alpaca account. Execution stays on hardware you control rather than someone else's server, with a display for real-time portfolio performance and trade activity.",
  },
  {
    label: "Monstra.guide",
    href: "https://monstra.guide",
    icon: "🧭",
    tagline: "Turn everyday work into a living AI textbook",
    description:
      "A workflow documentation platform. Senior staff record themselves doing a task, and those recordings become interactive step-by-step guides with screenshots and explanations for training and onboarding. Recording state stays visible, guides pass through human review, and sensitive applications or screenshots can be excluded before anything becomes shared knowledge.",
  },
  {
    label: "hexww2.world",
    href: "https://hexww2.world",
    icon: "🌍",
    tagline: "Earth on a Hex Globe",
    description:
      "A World War II strategy world built on a hex-tiled globe, so the whole Earth is one continuous playable grid rather than a flat map with distorted edges.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-ink px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        <header>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            <span className="text-gold">Monstra</span>, LLC
          </h1>
          <p className="mt-4 text-base leading-relaxed text-parchment/80">
            A small software company building quantitative research tools, trading automation, and
            the odd strange map.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-parchment/65">
            Everything here is designed and operated end to end — database and backend services
            through to the interfaces people actually use, deployment, and production monitoring.
          </p>
        </header>

        <section className="mt-14">
          <h2 className="mb-6 border-b border-gold/30 pb-2 text-xl font-semibold tracking-tight text-white">
            The Network
          </h2>
          <div className="space-y-4">
            {network.map(({ label, href, icon, tagline, description }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-purple-mid/40 bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-gold/60 hover:bg-surface-2 hover:shadow-[0_12px_40px_rgba(42,18,80,0.7)]"
              >
                <div className="flex items-baseline gap-3">
                  <span aria-hidden className="text-2xl">
                    {icon}
                  </span>
                  <div>
                    <span className="text-lg font-semibold text-parchment group-hover:text-gold">
                      {label}
                    </span>
                    <span className="ml-3 text-[11px] uppercase tracking-widest text-gold-soft/80">
                      {tagline}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-parchment/70">{description}</p>
              </a>
            ))}
          </div>

          <Link
            href="/future-projects"
            className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-gold/35 px-5 py-4 text-sm font-semibold text-gold-soft/85 transition-all duration-200 hover:border-gold/70 hover:text-gold"
          >
            Future Projects
            <span aria-hidden>→</span>
          </Link>
        </section>

        <section className="mt-14">
          <h2 className="mb-6 border-b border-gold/30 pb-2 text-xl font-semibold tracking-tight text-white">
            Who Runs It
          </h2>
          <Link
            href="/MatthewPoncini"
            className="group block rounded-2xl border border-purple-mid/40 bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-gold/60 hover:bg-surface-2 hover:shadow-[0_12px_40px_rgba(42,18,80,0.7)]"
          >
            <div className="flex items-baseline gap-3">
              <span aria-hidden className="text-2xl">
                👤
              </span>
              <div>
                <span className="text-lg font-semibold text-parchment group-hover:text-gold">
                  Matthew Poncini
                </span>
                <span className="ml-3 text-[11px] uppercase tracking-widest text-gold-soft/80">
                  Founder
                </span>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-parchment/70">
              Full-stack software engineer working on AI infrastructure, data systems, and
              evaluation, with an M.S. in Computer Science and a B.S. in Applied Mathematics.
              Portfolio, resume, and published coursework — including an interactive traveling
              salesman visualizer.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
              View portfolio <span aria-hidden>→</span>
            </span>
          </Link>
        </section>

        <footer className="mt-16 border-t border-purple-mid/40 pt-6 text-center text-xs tracking-wide text-parchment/35">
          © {new Date().getFullYear()} Monstra LLC
        </footer>
      </div>
    </main>
  );
}
