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

const projects: Site[] = [
  {
    label: "Monstra.bot",
    href: "https://monstra.bot",
    icon: "🤖",
    iconSrc: "/Monstrabot.webp",
    tagline: "Quantitative research and automation",
    description:
      "An end-to-end system for quantitative research and automated trading, built from data pipelines that turn raw market observations into normalized and clustered features, evaluation infrastructure for comparing models and strategies under explicit information cutoffs, and dashboards for monitoring portfolio state, algorithm behavior, and execution history. Validation runs through broker-executed paper trading, so results come from actual orders, fills, and positions.",
  },
  {
    label: "0to1evo.xyz",
    href: "https://0to1evo.xyz",
    icon: "🧬",
    tagline: "Evolving 0DTE and 1DTE options strategies",
    description:
      "A public genetic algorithm experiment on 0DTE and 1DTE options trading strategies. A population of a few hundred rule-based strategies (long calls and puts, credit spreads, and iron condors) trades on simulated fills each session; strategies are scored on their return since birth, then bred, cloned, or removed. Everything is out in the open: the full strategy list, family trees, a daily session log, \"fossils\" that freeze each week's leaders to test whether selection keeps working, and a comparison against a fixed iron condor baseline and a random control. An educational simulation, not investment advice.",
  },
  {
    label: "209adus.com",
    href: "https://www.209adus.com",
    icon: "🏡",
    tagline: "Valley ADU Studio",
    description:
      "A site for Valley ADU Studio, which designs and builds backyard ADUs, garage conversions, and farm worker housing along Highway 99 from Lodi to Fresno. Homeowners enter their address and drop a floor plan onto their own lot in a 3D visualizer to see how it fits next to the house and property line, walk through each furnished plan in 3D, and request a free consultation and quote.",
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
];

const sideProjects: Site[] = [
  {
    label: "January Fitness Cup",
    href: "https://fitness-cup-71zl.vercel.app",
    icon: "🏆",
    tagline: "A month-long race with friends",
    description:
      "A January fitness competition for a group of friends. Everyone logs workouts, golf rounds, and lifting sessions to earn points, and a live scoreboard and game board track who is ahead.",
  },
  {
    label: "park-quest.buzz",
    href: "https://www.park-quest.buzz",
    icon: "📸",
    iconSrc: "/parkquest.webp",
    tagline: "15 photo challenges, one phone each",
    description:
      "A photo scavenger hunt built for groups outdoors. Everyone brings a phone, works through fifteen photo challenges, and either joins someone else's hunt with a code or sets up a new one.",
  },
];

/** Public repositories on github.com/MPoncini96. */
const repos = [
  { name: "MonstraGuide", note: "The workflow documentation platform", lang: "TypeScript" },
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
    value: "Matt@MJPoncini.com",
    href: "mailto:Matt@MJPoncini.com",
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

function ProjectList({ title, sites }: { title: string; sites: Site[] }) {
  return (
    <section className="mt-14">
      <h2 className="mb-6 border-b border-gold/30 pb-2 text-xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      <div className="space-y-4">
        {sites.map((site) => {
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
              <p className="mt-3 text-sm leading-relaxed text-parchment/70">{site.description}</p>
            </>
          );

          // Planned sites have no page to send anyone to yet.
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
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-ink px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        {/* Intro and about card sit side by side on wide screens, stacked on mobile. */}
        <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-8">
          <header>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="text-gold">Matthew Poncini</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-parchment/80">
              Full-stack software engineer working on AI infrastructure, data systems, and
              evaluation. I build things end to end, from databases and backend services through to
              the interfaces people use, deployment, and production monitoring.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-parchment/65">
              Below are the projects I am building now, from quantitative trading research to
              software for a Central Valley ADU builder, plus a few side projects made for friends
              and family.
            </p>
          </header>

          <section>
            <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gold">
              About Me
            </h2>
            <Link
              href="/AboutMe"
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
                    Portfolio and resume
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-gold-soft/80">
                    M.S. Computer Science · B.S. Applied Mathematics
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-parchment/70">
                Background, resume, and published coursework, including an interactive traveling
                salesman visualizer.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
                View portfolio <span aria-hidden>→</span>
              </span>
            </Link>
          </section>
        </div>

        <ProjectList title="Projects" sites={projects} />
        <ProjectList title="Side Projects" sites={sideProjects} />

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
          © {new Date().getFullYear()} Matthew Poncini
        </footer>
      </div>
    </main>
  );
}
