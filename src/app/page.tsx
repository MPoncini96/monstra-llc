import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import ProjectCarousel from "./ProjectCarousel";

/*
 * Placeholders: anything still unknown is written as a TODO string in this
 * file and is NOT shown on the live page (a blank stays blank instead of
 * printing "[TODO]" to visitors). Search this file for "TODO" to fill them in.
 */
const isTodo = (value?: string) => !value || value.startsWith("[TODO");

type Status = "Live" | "In progress" | "Prototype";

type Project = {
  id: string;
  label: string;
  href: string;
  /** Emoji fallback, used when the project has no logo image. */
  icon: string;
  /** Square logo in /public, preferred over the emoji when present. */
  iconSrc?: string;
  tagline: string;
  status: Status | "[TODO: status]";
  stack: string;
  /** Public repo URL, or "private" when the code is not public. */
  code: string;
  /** Short description, or bullets when the project needs more than a sentence. */
  description?: string;
  bullets?: { text: string; metric: string }[];
};

const projects: Project[] = [
  {
    id: "monstra-bot",
    label: "Monstra.bot",
    href: "https://monstra.bot",
    icon: "🤖",
    iconSrc: "/Monstrabot.webp",
    tagline: "Quantitative research and automation",
    status: "[TODO: status]",
    stack: "Python · TypeScript · Next.js · PostgreSQL · REST APIs",
    code: "private",
    bullets: [
      {
        text: "Data pipeline: turns raw market data into normalized, clustered features.",
        metric: "[TODO: metric, e.g. tickers or rows processed]",
      },
      {
        text: "Evaluation: compares models and strategies under explicit information cutoffs.",
        metric: "[TODO: metric, e.g. strategies evaluated]",
      },
      {
        text: "Validation: paper trading executed at the broker, with real orders, fills, and positions.",
        metric: "[TODO: metric, e.g. uptime or trades executed]",
      },
    ],
  },
  {
    id: "0to1evo",
    label: "0to1evo.xyz",
    href: "https://0to1evo.xyz",
    icon: "🧬",
    tagline: "Evolving 0DTE and 1DTE options strategies",
    status: "Live",
    stack: "TypeScript · Next.js · PostgreSQL · Python worker on a Raspberry Pi",
    code: "private",
    description:
      "A public genetic algorithm experiment on 0DTE and 1DTE options strategies. A few hundred rule-based strategies trade on simulated fills each session and are scored, bred, cloned, or removed, with every strategy, family tree, and session log published. An educational simulation, not investment advice.",
  },
  {
    id: "209adus",
    label: "209adus.com",
    href: "https://www.209adus.com",
    icon: "🏡",
    tagline: "Valley ADU Studio",
    status: "Live",
    stack: "Next.js · React · Three.js · Google Maps API · glTF",
    code: "https://github.com/MPoncini96/adu-visualizer",
    description:
      "Site for a Central Valley ADU builder. Homeowners enter their address, drop a floor plan onto their own lot in a 3D visualizer, walk through each furnished plan, and request a quote.",
  },
  {
    id: "hexww2",
    label: "hexww2.world",
    href: "https://hexww2.world",
    icon: "🌍",
    iconSrc: "/logo2.webp",
    tagline: "Earth on a hex globe",
    status: "[TODO: status]",
    stack: "React · Vite · Node.js",
    code: "https://github.com/MPoncini96/CatanWW2",
    description:
      "A World War II strategy game board built on a hex-tiled globe, so the whole Earth is one continuous playable grid rather than a flat map with distorted edges.",
  },
];

type Paper = {
  title: string;
  takeaway: string;
  repo: string;
  paper: string;
  demo?: { label: string; href: string };
};

const research: Paper[] = [
  {
    title: "QLoRA fine-tuning of LLaMA-2 on financial QA",
    takeaway:
      "Fine-tuning LLaMA-2-7B with 4-bit QLoRA raised ROUGE-1 from 0.12 to 0.25 on a held-out financial question-answering set.",
    repo: "https://github.com/MPoncini96/QLoRA-FineTuning-Llama2-Finance-Alpaca",
    paper: "/academic/qlora-finetuning-llama2.pdf",
  },
  {
    title: "Open shop scheduling: Wisdom of Crowds + GA hybrid",
    takeaway:
      "The GA-WoC hybrid matched or beat a time-matched random solver on all ten benchmarks, with the largest gains on 10- to 20-job problems.",
    repo: "https://github.com/MPoncini96/OSSP-Scheduler-WoC-GA-Hybrid",
    paper: "/academic/open-shop-scheduling-ga-woc.pdf",
  },
  {
    title: "Bottleneck TSP: simulated annealing and niching GA vs an LKH baseline",
    takeaway:
      "LKH and the best simulated annealing schedules reached slightly lower bottlenecks on larger instances, and LKH was the fastest method at every size.",
    repo: "https://github.com/MPoncini96/Bottleneck-TSP-Solutions-with-SA-and-Niching-GA-and-a-LKH-Baseline",
    paper: "/academic/bottleneck-tsp-sa-niching-ga.pdf",
    demo: { label: "Interactive TSP visualizer", href: "/tsp/" },
  },
  {
    title: "9-mer peptide clustering with UMAP + HDBSCAN",
    takeaway:
      "Across one million peptides, clustering found clear physicochemical structure, but none of 229 engineered features recovered a peptide's biological source.",
    repo: "https://github.com/MPoncini96/Peptide-Unsupervised-Clustering-with-UMAP-and-HDBSCAN",
    paper: "/academic/peptide-clustering.pdf",
  },
  {
    title: "Trojan horse traffic classification (supervised learning)",
    takeaway:
      "Of six classifiers trained on about 160,000 network flows, Random Forest separated trojan from benign traffic best, with an AUC of 0.767.",
    repo: "https://github.com/MPoncini96/Supervised-Learning-Trojan-Horse-Data",
    paper: "/academic/trojan-horse-classification.pdf",
  },
];

/** Other papers already hosted on the site, kept as a compact list. */
const morePapers = [
  { title: "LLM-based financial signal generation", href: "/academic/forex-llm-sentiment-signals.pdf" },
  { title: "GA + Wisdom of Crowds for the TSP", href: "/academic/tsp-ga-wisdom-of-crowds.pdf" },
  { title: "Niching genetic algorithms", href: "/academic/niching-ga-experimentation.pdf" },
  { title: "Gradient descent optimization methods", href: "/academic/gradient-descent-optimization.pdf" },
  { title: "Trie-based search completion", href: "/academic/trie-search-completion.pdf" },
  { title: "Round robin CPU scheduling", href: "/academic/round-robin-cpu-scheduling.pdf" },
];

const experience = [
  {
    role: "Founder & Engineer, Monstra.bot",
    where: "San Francisco, CA",
    dates: "2025–present",
    line: "Built a quantitative research and automation platform solo, from database and backend services to the web interface, deployment, and monitoring.",
  },
  {
    role: "Math, Statistics & Computer Science Teacher, ICA Cristo Rey",
    where: "San Francisco, CA",
    dates: "2021–2025",
    line: "About 120 students a year; 11th grade team lead; reported student performance data to the Cristo Rey Network.",
  },
  {
    role: "Staff Sergeant, Test Equipment Calibration (94H), California Army National Guard",
    where: "Stockton, CA",
    dates: "2019–2025",
    line: "Team chief over 5–7 technicians; deployed to Kuwait 2023–24.",
    honors:
      "Army Commendation Medal · Honor Graduate, 94H course, U.S. Army Ordnance School · Basic Leader Course",
  },
  {
    role: "Actuarial Intern, CSAA Insurance Group",
    where: "Remote",
    dates: "2021",
    line: "Built a SAS model predicting customer retention under capped premium changes.",
  },
];

const education = [
  { degree: "M.S. Computer Science", school: "University of Louisville", year: "2026" },
  { degree: "B.S. Applied Mathematics", school: "Saint Mary's College of California", year: "2018" },
];

const skills = [
  { heading: "Languages", items: "Python, TypeScript, JavaScript, SQL, C++, SAS" },
  {
    heading: "Full-stack",
    items: "React, Next.js, Node.js, REST APIs, PostgreSQL, Prisma, authentication",
  },
  {
    heading: "AI / ML",
    items: "PyTorch, Hugging Face Transformers, PEFT, QLoRA, LLaMA-2, clustering, model evaluation",
  },
  {
    heading: "Production",
    items: "Docker, Linux, background workers, scheduled jobs, retries, idempotency, observability",
  },
];

const repos = [
  {
    name: "monstra-llc",
    note: "This site: Next.js static export hosted on GitHub Pages",
    lang: "TypeScript",
    href: "https://github.com/MPoncini96/monstra-llc",
  },
  {
    name: "adu-visualizer",
    note: "209adus.com: 3D ADU placement on a homeowner's own lot",
    lang: "JavaScript",
    href: "https://github.com/MPoncini96/adu-visualizer",
  },
  {
    name: "CatanWW2",
    note: "hexww2.world: World War II board on a hex-tiled globe",
    lang: "JavaScript",
    href: "https://github.com/MPoncini96/CatanWW2",
  },
  {
    name: "MonstraBackfill",
    note: "Historical market data backfill for Monstra.bot",
    lang: "Python",
    // Private repo: listed without a link so visitors don't hit a 404.
    href: "",
  },
];

const sideProjects = [
  {
    label: "January Fitness Cup",
    href: "https://fitness-cup-71zl.vercel.app",
    icon: "🏆",
    description:
      "A month-long fitness race for a group of friends, with points for workouts, golf rounds, and lifting, and a live scoreboard.",
  },
];

const contacts = [
  { label: "Email", value: "Matt@MJPoncini.com", href: "mailto:Matt@MJPoncini.com", icon: "✉️" },
  { label: "GitHub", value: "MPoncini96", href: "https://github.com/MPoncini96", icon: "🐙" },
  {
    label: "LinkedIn",
    value: "matt-poncini",
    href: "https://www.linkedin.com/in/matt-poncini",
    icon: "💼",
  },
];

/** Drop a screenshot at public/screenshots/<project id>.webp and it replaces the placeholder. */
function screenshotFor(id: string) {
  const rel = `/screenshots/${id}.webp`;
  return existsSync(path.join(process.cwd(), "public", rel)) ? rel : null;
}

const card =
  "rounded-2xl border border-purple-mid/40 bg-surface transition-all duration-200 hover:border-gold/60 hover:bg-surface-2";

const buttonPrimary =
  "inline-flex items-center gap-2 rounded-full border border-gold/70 bg-gold px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-gold-soft";

const buttonGhost =
  "inline-flex items-center gap-2 rounded-full border border-purple-mid/60 bg-surface px-4 py-2 text-xs font-semibold text-parchment transition-colors hover:border-gold/60 hover:text-gold";

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="mb-6 scroll-mt-24 border-b border-gold/30 pb-2 text-xl font-semibold tracking-tight text-white"
    >
      {children}
    </h2>
  );
}

function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

function ProjectIcon({ project, size }: { project: Project; size: "sm" | "lg" }) {
  const box = size === "lg" ? "h-16 w-16" : "h-10 w-10";
  return project.iconSrc ? (
    <Image
      src={project.iconSrc}
      alt=""
      width={128}
      height={128}
      className={`${box} shrink-0 rounded-lg object-contain`}
    />
  ) : (
    <span aria-hidden className={size === "lg" ? "text-5xl" : "text-2xl"}>
      {project.icon}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const shot = screenshotFor(project.id);
  return (
    <article className={`${card} flex h-full flex-col overflow-hidden`}>
      {shot ? (
        <Image
          src={shot}
          alt={`Screenshot of ${project.label}`}
          width={1280}
          height={720}
          className="aspect-video w-full border-b border-purple-mid/40 object-cover object-top"
        />
      ) : (
        // TODO: screenshot. Add public/screenshots/<id>.webp (16:9) to replace this panel.
        <div className="flex h-28 w-full items-center sm:h-32 justify-center border-b border-purple-mid/40 bg-gradient-to-br from-purple-deep via-surface to-ink">
          <ProjectIcon project={project} size="lg" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="text-lg font-semibold text-parchment">{project.label}</h3>
          {!isTodo(project.status) && (
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${
                project.status === "Live"
                  ? "border-gold/60 text-gold"
                  : "border-dashed border-gold/45 text-gold-soft/85"
              }`}
            >
              {project.status}
            </span>
          )}
        </div>
        <p className="mt-1 text-[11px] uppercase tracking-widest text-gold-soft/80">
          {project.tagline}
        </p>

        {project.description && (
          <p className="mt-3 text-sm leading-relaxed text-parchment/70">{project.description}</p>
        )}
        {project.bullets && (
          <ul className="mt-3 space-y-1.5">
            {project.bullets.map(({ text, metric }) => (
              <li key={text} className="flex gap-2 text-sm leading-relaxed text-parchment/70">
                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                <span>
                  {text}
                  {!isTodo(metric) && <span className="text-gold-soft"> {metric}</span>}
                </span>
              </li>
            ))}
          </ul>
        )}

        {!isTodo(project.stack) && (
          <p className="mt-4 font-mono text-[11px] leading-relaxed text-parchment/55">
            {project.stack}
          </p>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <ExternalLink href={project.href} className={buttonPrimary}>
            Live <span aria-hidden>↗</span>
          </ExternalLink>
          {project.code === "private" ? (
            <span className={`${buttonGhost} cursor-default opacity-60 hover:border-purple-mid/60 hover:text-parchment`}>
              Code: private repo
            </span>
          ) : (
            <ExternalLink href={project.code} className={buttonGhost}>
              Code <span aria-hidden>↗</span>
            </ExternalLink>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-ink px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-3xl">
        {/* Hero */}
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <Image
            src="/IMG_4266.webp"
            alt="Matthew Poncini"
            width={240}
            height={240}
            priority
            className="h-24 w-24 shrink-0 rounded-full border-2 border-gold/50 object-cover sm:h-28 sm:w-28"
          />
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gold sm:text-5xl">
              Matthew Poncini
            </h1>
            <p className="mt-3 text-base leading-relaxed text-parchment/80">
              Full-stack software engineer working on AI infrastructure, data systems, and
              evaluation. I build things end to end, from databases and backend services through to
              the interfaces people use, deployment, and production monitoring.
            </p>
          </div>
        </header>
        <div className="mt-6 flex flex-wrap gap-2">
          <a href="/resume.pdf" className={buttonPrimary} download>
            Download resume (PDF)
          </a>
          <ExternalLink href="https://github.com/MPoncini96" className={buttonGhost}>
            🐙 GitHub
          </ExternalLink>
          <ExternalLink href="https://www.linkedin.com/in/matt-poncini" className={buttonGhost}>
            💼 LinkedIn
          </ExternalLink>
        </div>

        {/* Projects */}
        <section className="mt-16">
          <SectionHeading id="projects">Projects</SectionHeading>
          <ProjectCarousel>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ProjectCarousel>
        </section>

        {/* Research */}
        <section className="mt-16">
          <SectionHeading id="research">Research</SectionHeading>
          <p className="-mt-2 mb-6 text-sm leading-relaxed text-parchment/70">
            Papers from my M.S. in Computer Science at the University of Louisville, each with its
            notebook and code.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {research.map(({ title, takeaway, repo, paper, demo }) => (
              <article key={repo} className={`${card} flex flex-col p-5`}>
                <h3 className="text-sm font-semibold leading-snug text-white">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-parchment/70">{takeaway}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold">
                  <ExternalLink href={repo} className="text-gold hover:text-gold-soft">
                    Notebook ↗
                  </ExternalLink>
                  <a href={paper} target="_blank" rel="noopener" className="text-gold hover:text-gold-soft">
                    Paper (PDF) ↗
                  </a>
                  {demo && (
                    <a href={demo.href} className="text-gold hover:text-gold-soft">
                      {demo.label} →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold-soft/80">
              More papers
            </h3>
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
              {morePapers.map(({ title, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    className="text-parchment/70 underline decoration-purple-mid underline-offset-4 hover:text-gold hover:decoration-gold"
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Experience */}
        <section className="mt-16">
          <SectionHeading id="experience">Experience</SectionHeading>
          <ol className="relative space-y-6 border-l border-purple-mid/60 pl-5">
            {experience.map(({ role, where, dates, line, honors }) => (
              <li key={role} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full border border-gold bg-ink"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-sm font-semibold text-white">{role}</h3>
                  <span className="text-xs text-parchment/50">{dates}</span>
                </div>
                <p className="text-xs text-parchment/45">{where}</p>
                <p className="mt-1 text-sm leading-relaxed text-parchment/70">{line}</p>
                {honors && <p className="mt-1 text-xs leading-relaxed text-gold-soft/85">{honors}</p>}
              </li>
            ))}
          </ol>

          <h3 className="mt-10 mb-3 text-xs font-semibold uppercase tracking-widest text-gold-soft/80">
            Education
          </h3>
          <ul className="space-y-1.5">
            {education.map(({ degree, school, year }) => (
              <li
                key={degree}
                className="flex flex-wrap items-baseline justify-between gap-x-4 text-sm"
              >
                <span>
                  <span className="font-semibold text-parchment">{degree}</span>
                  <span className="text-parchment/60">, {school}</span>
                </span>
                <span className="text-xs text-parchment/50">{year}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 mb-3 text-xs font-semibold uppercase tracking-widest text-gold-soft/80">
            Skills
          </h3>
          <dl className="space-y-2">
            {skills.map(({ heading, items }) => (
              <div key={heading} className="text-sm sm:flex sm:gap-3">
                <dt className="shrink-0 font-semibold text-parchment sm:w-28">{heading}</dt>
                <dd className="text-parchment/65">{items}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Open Source */}
        <section className="mt-16">
          <SectionHeading id="open-source">Open Source</SectionHeading>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {repos.map(({ name, note, lang, href }) => {
              const body = (
                <>
                  <span className="flex items-center justify-between gap-2">
                    <span className="break-words font-mono text-xs font-semibold text-parchment group-hover:text-gold">
                      {name}
                    </span>
                    {!href && (
                      <span className="text-[10px] uppercase tracking-widest text-parchment/40">
                        Private
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-[11px] leading-snug text-parchment/60">
                    {note}
                    <span className="text-gold-soft/70"> · {lang}</span>
                  </span>
                </>
              );
              return href ? (
                <ExternalLink key={name} href={href} className={`${card} group block px-4 py-3`}>
                  {body}
                </ExternalLink>
              ) : (
                <div key={name} className="rounded-xl border border-dashed border-purple-mid/40 bg-surface/60 px-4 py-3">
                  {body}
                </div>
              );
            })}
          </div>
        </section>

        {/* Side Projects */}
        <section className="mt-16">
          <SectionHeading id="side-projects">Side Projects</SectionHeading>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {sideProjects.map(({ label, href, icon, description }) => (
              <ExternalLink key={href} href={href} className={`${card} group block px-4 py-3`}>
                <span className="flex items-center gap-2 text-sm font-semibold text-parchment group-hover:text-gold">
                  <span aria-hidden>{icon}</span>
                  {label}
                </span>
                <span className="mt-1 block text-xs leading-snug text-parchment/60">
                  {description}
                </span>
              </ExternalLink>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mt-16">
          <SectionHeading id="contact">Contact</SectionHeading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {contacts.map(({ label, value, href, icon }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`${card} group flex flex-col gap-1 px-5 py-4`}
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
