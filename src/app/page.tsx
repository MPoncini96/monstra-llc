import Image from "next/image";
import Link from "next/link";

type Site = {
  label: string;
  href: string;
  /** Emoji fallback, used when the site has no logo image. */
  icon: string;
  /** Square logo in /public, preferred over the emoji when present. */
  iconSrc?: string;
  tagline: string;
  description: string;
  status?: string;
};

const network: Site[] = [
  {
    label: "Monstra.bot",
    href: "https://monstra.bot",
    icon: "🤖",
    iconSrc: "/Monstrabot.webp",
    tagline: "Quantitative research and automation",
    description:
      "The core platform. An end-to-end system for quantitative research and automated trading, built from data pipelines that turn raw market observations into normalized and clustered features, evaluation infrastructure for comparing models and strategies under explicit information cutoffs, and dashboards for monitoring portfolio state, algorithm behavior, and execution history. Validation runs through broker-executed paper trading, so results come from actual orders, fills, and positions.",
  },
  {
    label: "Monstra.pro",
    href: "https://monstra.pro",
    icon: "⚡",
    iconSrc: "/monstra-pro-box.webp",
    tagline: "The Monstra Pro Box",
    description:
      "A dedicated device that runs your Monstra bots locally and trades on your own Alpaca account. Execution stays on hardware you control rather than someone else's server, with a display for real-time portfolio performance and trade activity.",
  },
  {
    label: "Monstra.guide",
    href: "https://monstra.guide",
    icon: "🧭",
    iconSrc: "/monstraguide.webp",
    tagline: "Turn everyday work into a living AI textbook",
    description:
      "A workflow documentation platform. Senior staff record themselves doing a task, and those recordings become interactive step-by-step guides with screenshots and explanations for training and onboarding. Recording state stays visible, guides pass through human review, and sensitive applications or screenshots can be excluded before anything becomes shared knowledge.",
  },
  {
    label: "Monstra.study",
    href: "https://monstra.study",
    icon: "📚",
    iconSrc: "/monstra-study.webp",
    tagline: "How I would run a school",
    description:
      "A blueprint for how I would run a school, built out as a working site rather than written up as a document. It takes what I learned teaching mathematics and computer science and turns it into a concrete plan for how a school could be structured.",
  },
  {
    label: "hexww2.world",
    href: "https://hexww2.world",
    icon: "🌍",
    iconSrc: "/logo2.webp",
    tagline: "Earth on a Hex Globe",
    description:
      "A World War II strategy world built on a hex-tiled globe, so the whole Earth is one continuous playable grid rather than a flat map with distorted edges.",
  },
  {
    label: "park-quest.buzz",
    href: "https://park-quest.buzz",
    icon: "📸",
    iconSrc: "/parkquest.webp",
    tagline: "14 photo challenges, one phone each",
    description:
      "A photo scavenger hunt built for groups outdoors. Everyone brings a phone, works through fourteen photo challenges, and either joins someone else's hunt with a code or sets up a new one.",
  },
];

/** Public repositories on github.com/MPoncini96. */
const repos = [
  { name: "MonstraGuide", note: "The workflow documentation platform", lang: "TypeScript" },
  { name: "MonstraPro", note: "Software for the Pro Box device", lang: "Python" },
  { name: "study", note: "The Monstra.study concept site", lang: "JavaScript" },
  { name: "MonstraBackfill", note: "Historical market data backfill", lang: "Python" },
  { name: "monstra-llc", note: "This site", lang: "TypeScript" },
  {
    name: "QLoRA-FineTuning-Llama2-Finance-Alpaca",
    note: "Paper: fine-tuning LLaMA-2 on financial QA",
    lang: "Jupyter",
  },
  {
    name: "OSSP-Scheduler-WoC-GA-Hybrid",
    note: "Paper: open shop scheduling with Wisdom of Crowds",
    lang: "Jupyter",
  },
  {
    name: "Bottleneck-TSP-Solutions-with-SA-and-Niching-GA-and-a-LKH-Baseline",
    note: "Paper: simulated annealing and niching GAs",
    lang: "Jupyter",
  },
  {
    name: "Peptide-Unsupervised-Clustering-with-UMAP-and-HDBSCAN",
    note: "Paper: 9-mer peptide clustering",
    lang: "Jupyter",
  },
  {
    name: "Supervised-Learning-Trojan-Horse-Data",
    note: "Paper: Trojan horse traffic classification",
    lang: "Jupyter",
  },
];

const contacts = [
  {
    label: "Email",
    value: "MPoncini@monstra.bot",
    href: "mailto:MPoncini@monstra.bot",
    icon: "✉️",
  },
  {
    label: "GitHub",
    value: "MPoncini96",
    href: "https://github.com/MPoncini96",
    icon: "🐙",
  },
  {
    label: "LinkedIn",
    value: "matt-poncini",
    href: "https://www.linkedin.com/in/matt-poncini",
    icon: "💼",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-ink px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        {/* Intro and founder sit side by side on wide screens, stacked on mobile. */}
        <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-8">
          <header>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="text-gold">Monstra</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-parchment/80">
              My open-source research project. I use it to work through problems in quantitative
              research, optimization, and applied machine learning, then ship the result as
              something you can actually use and read the source of.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-parchment/65">
              Each project is built end to end, from database and backend services through to the
              interfaces people use, deployment, and production monitoring. The code is public, and
              the research behind it is written up and published.
            </p>
          </header>

          <section>
            <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gold">
              Built By
            </h2>
            <Link
              href="/MatthewPoncini"
              className="group block rounded-2xl border border-purple-mid/40 bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-gold/60 hover:bg-surface-2 hover:shadow-[0_12px_40px_rgba(42,18,80,0.7)]"
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/IMG_4266.webp"
                  alt=""
                  width={160}
                  height={160}
                  className="h-14 w-14 shrink-0 rounded-full border border-gold/40 object-cover"
                />
                <div>
                  <span className="block text-lg font-semibold text-parchment group-hover:text-gold">
                    Matthew Poncini
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-gold-soft/80">
                    Founder
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-parchment/70">
                Full-stack software engineer working on AI infrastructure, data systems, and
                evaluation, with an M.S. in Computer Science and a B.S. in Applied Mathematics.
                Portfolio, resume, and published coursework, including an interactive traveling
                salesman visualizer.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
                View portfolio <span aria-hidden>→</span>
              </span>
            </Link>
          </section>
        </div>

        <section className="mt-14">
          <h2 className="mb-6 border-b border-gold/30 pb-2 text-xl font-semibold tracking-tight text-white">
            Projects
          </h2>
          <div className="space-y-4">
            {network.map((site) => {
              const body = (
                <>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {site.iconSrc ? (
                      <Image
                        src={site.iconSrc}
                        alt=""
                        width={96}
                        height={96}
                        className="h-14 w-14 shrink-0 rounded-lg object-contain"
                      />
                    ) : (
                      <span aria-hidden className="text-2xl">
                        {site.icon}
                      </span>
                    )}
                    <span
                      className={`text-lg font-semibold text-parchment ${
                        site.status ? "" : "group-hover:text-gold"
                      }`}
                    >
                      {site.label}
                    </span>
                    <span className="text-[11px] uppercase tracking-widest text-gold-soft/80">
                      {site.tagline}
                    </span>
                    {site.status && (
                      <span className="rounded-full border border-dashed border-gold/45 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gold-soft/85">
                        {site.status}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-parchment/70">
                    {site.description}
                  </p>
                </>
              );

              // Sites still in development have no page to send anyone to yet.
              return site.status ? (
                <div
                  key={site.href}
                  className="rounded-2xl border border-dashed border-purple-mid/40 bg-surface/60 p-6"
                >
                  {body}
                </div>
              ) : (
                <a
                  key={site.href}
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl border border-purple-mid/40 bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-gold/60 hover:bg-surface-2 hover:shadow-[0_12px_40px_rgba(42,18,80,0.7)]"
                >
                  {body}
                </a>
              );
            })}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="mb-2 border-b border-gold/30 pb-2 text-xl font-semibold tracking-tight text-white">
            Open Source
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-parchment/70">
            The code behind the sites, and the notebooks behind each research paper, are public on{" "}
            <a
              href="https://github.com/MPoncini96"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold underline underline-offset-2 hover:text-gold-soft"
            >
              GitHub
            </a>
            .
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {repos.map(({ name, note, lang }) => (
              <a
                key={name}
                href={`https://github.com/MPoncini96/${name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-purple-mid/40 bg-surface px-4 py-3 transition-all duration-200 hover:border-gold/60 hover:bg-surface-2"
              >
                <span className="block break-words font-mono text-xs font-semibold text-parchment group-hover:text-gold">
                  {name}
                </span>
                <span className="mt-1 block text-[11px] leading-snug text-parchment/60">
                  {note}
                  <span className="text-gold-soft/70"> · {lang}</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="mb-6 border-b border-gold/30 pb-2 text-xl font-semibold tracking-tight text-white">
            Contact
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {contacts.map(({ label, value, href, icon }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-col gap-1 rounded-2xl border border-purple-mid/40 bg-surface px-5 py-4 transition-all duration-200 hover:-translate-y-1 hover:border-gold/60 hover:bg-surface-2 hover:shadow-[0_12px_40px_rgba(42,18,80,0.7)]"
              >
                <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-gold-soft/80">
                  <span aria-hidden>{icon}</span>
                  {label}
                </span>
                <span className="break-all text-sm font-semibold text-parchment group-hover:text-gold">
                  {value}
                </span>
              </a>
            ))}
          </div>
        </section>

        <footer className="mt-16 border-t border-purple-mid/40 pt-6 text-center text-xs tracking-wide text-parchment/35">
          © {new Date().getFullYear()} Monstra LLC
        </footer>
      </div>
    </main>
  );
}
