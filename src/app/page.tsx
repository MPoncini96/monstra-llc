import Image from "next/image";
import Link from "next/link";

const contactLinks = [
  { label: "Resume", href: "/PonciniResume.pdf", icon: "📄" },
  { label: "GitHub", href: "https://github.com/MPoncini96", icon: "🐙" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/matt-poncini", icon: "💼" },
  { label: "Email", href: "mailto:MJPon8896@gmail.com", icon: "✉️" },
];

const projectLinks = [
  {
    label: "Monstra.bot",
    href: "https://monstra.bot",
    icon: "🤖",
    tag: "Quantitative research & automation",
  },
  {
    label: "Monstra.pro",
    href: "https://monstra.pro",
    icon: "⚡",
    tag: "Professional",
  },
  {
    label: "hexww2.world",
    href: "https://hexww2.world",
    icon: "🌍",
    tag: "Hex WWII strategy",
  },
];

const skills = [
  {
    heading: "Languages",
    items: "Python, TypeScript, JavaScript, SQL, C++, SAS",
  },
  {
    heading: "Full-Stack Engineering",
    items:
      "React, Next.js, Node.js, REST APIs, PostgreSQL, Prisma, authentication, responsive interfaces, internal tools",
  },
  {
    heading: "AI / ML",
    items:
      "PyTorch, Hugging Face Transformers, PEFT, TRL, LoRA, QLoRA, LLaMA-2, classification, feature engineering, clustering, model evaluation, prompt design",
  },
  {
    heading: "Data and Evaluation Systems",
    items:
      "Data pipelines, experiment tracking, versioned configurations, model outputs, benchmark comparison, failure analysis, statistical analysis, reproducible evaluation",
  },
  {
    heading: "Production Engineering",
    items:
      "Docker, Linux, background workers, scheduled jobs, retries, idempotency, transactional state management, observability, recovery workflows, Vercel, Render",
  },
];

const experience = [
  {
    role: "Founder & Full-Stack Software Engineer",
    org: "Monstra.bot",
    location: "San Francisco, CA",
    dates: "2026–Present",
    bullets: [
      "Founded and built an end-to-end quantitative research and automation platform using Python, TypeScript, Next.js, PostgreSQL, REST APIs, and external integrations.",
      "Own the full product surface from database design and backend services through user-facing web and mobile interfaces, deployment, monitoring, and production debugging.",
      "Designed modular workflows for configuring algorithms, portfolios, execution settings, external integrations, and system state while abstracting complex backend behavior into understandable user experiences.",
      "Built data pipelines that transform raw market observations into normalized, clustered, and composite feature representations used by downstream research and decision systems.",
      "Developed evaluation infrastructure for comparing models, strategies, parameter configurations, and changing data universes using reproducible experiments and explicit information cutoffs.",
      "Built dashboards and product surfaces for monitoring portfolio state, algorithm behavior, execution history, system actions, positions, and performance.",
      "Engineered backend workflows that ingest data, evaluate model outputs, validate readiness, execute external API actions, and preserve attribution from input state through observed outcome.",
      "Designed reliability controls including retries, idempotency, transactional completion ordering, stale-output protection, exact-run matching, recovery jobs, and structured failure reporting.",
      "Migrated production validation from modeled historical execution to broker-executed paper trading, enabling evaluation through actual orders, fills, positions, and resulting portfolio state.",
      "Operate independently across frontend, backend, data, infrastructure, and product direction, identifying high-impact problems and driving them from ambiguous idea to deployed system.",
    ],
  },
];

const mlProjects = [
  {
    title: "Fine-Tuning LLaMA-2-7B with QLoRA",
    year: "2025",
    bullets: [
      "Fine-tuned LLaMA-2-7B on a domain-specific financial question-answering dataset using PyTorch, Hugging Face Transformers, PEFT, TRL, BitsAndBytes, and QLoRA.",
      "Built a complete training and evaluation pipeline with separate training and held-out test sets, covering tokenization, batching, GPU execution, generation, output extraction, and metric computation.",
      "Used 4-bit NF4 quantization and parameter-efficient LoRA adapters while keeping base-model weights frozen.",
      "Improved ROUGE-1 from 0.1205 to 0.2519 and ROUGE-Lsum from 0.0818 to 0.1526 after fine-tuning.",
      "Evaluated hallucination, truncation, verbosity, domain adaptation, and behavioral overfitting in addition to aggregate metrics.",
    ],
  },
  {
    title: "LLM-Based Financial Signal Generation",
    year: "2025",
    bullets: [
      "Designed an end-to-end ML experiment testing whether economic-news language contained useful information for predicting subsequent foreign-exchange movement.",
      "Collected and labeled 1,160 historical news observations, aligned them with future EURUSD, EURJPY, and USDJPY price changes, and created directional classification targets.",
      "Fine-tuned three specialized LLaMA-2-7B QLoRA adapters and evaluated them against held-out examples.",
      "Identified model collapse toward the majority Neutral class despite improving aggregate accuracy, tracing the failure to class imbalance and insufficient discriminatory signal.",
      "Proposed revised sampling, weighting, feature, and objective strategies based on observed model behavior rather than treating benchmark improvement alone as success.",
    ],
  },
  {
    title: "Open Shop Scheduling with Wisdom of Crowds",
    year: "2025",
    bullets: [
      "Built Python experiments using five independently evolving genetic-algorithm populations with different parameter configurations to solve open-shop scheduling problems.",
      "Designed fitness functions, selection and mutation workflows, experiment tracking, parameter comparison, and statistical evaluation.",
      "Aggregated independently optimized schedules through a Wisdom of Crowds approach and evaluated the effect on solution quality.",
    ],
  },
];

const additionalExperience = [
  {
    role: "Staff Sergeant, 94H Test, Measurement, and Diagnostic Equipment Specialist",
    org: "U.S. Army National Guard",
    location: "",
    dates: "May 2019–May 2026",
    bullets: [
      "Led technical personnel supporting more than $10 million in precision test and calibration equipment; diagnosed complex system failures through structured testing, validation, troubleshooting, and root-cause analysis.",
      "Managed technical workflows, documentation, accountability, and competing operational priorities in a high-reliability environment.",
    ],
  },
  {
    role: "Mathematics and Computer Science Teacher",
    org: "ICA Cristo Rey",
    location: "San Francisco, CA",
    dates: "August 2021–June 2025",
    bullets: [
      "Taught mathematics, statistics, programming, and quantitative reasoning while translating complex technical concepts for users with different levels of technical experience.",
      "Designed curricula, tools, assessments, and workflows around user needs and iterated based on direct feedback and observed outcomes.",
    ],
  },
  {
    role: "Actuarial Intern",
    org: "CSAA Insurance Group",
    location: "Remote",
    dates: "January 2021–April 2021",
    bullets: [
      "Supported pricing and retention research using SAS, statistical analysis, quantitative modeling, data validation, and business-impact analysis.",
    ],
  },
];

const education = [
  {
    school: "University of Louisville",
    degree: "Master of Science in Computer Science",
    location: "Louisville, KY",
    dates: "May 2026",
    detail:
      "Relevant study: generative AI, artificial intelligence, machine learning, optimization, algorithms, data mining, databases, software engineering, computer systems, applied statistics, and C++ programming.",
  },
  {
    school: "Saint Mary’s College of California",
    degree: "Bachelor of Science in Applied Mathematics, Minor in Economics",
    location: "Moraga, CA",
    dates: "Spring 2018",
    detail:
      "Relevant study: probability, statistics, regression, numerical methods, mathematical modeling, optimization, economics, and game theory.",
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 border-b border-white/10 pb-2 text-xl font-semibold tracking-tight text-white">
      {children}
    </h2>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-400">
          <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-purple-500/70" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        {/* Hero */}
        <header className="flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-8 sm:text-left">
          <Image
            src="/marathon.webp"
            alt="Matthew Poncini"
            width={256}
            height={256}
            priority
            className="h-36 w-36 shrink-0 rounded-2xl border border-white/10 object-cover shadow-[0_12px_40px_rgba(124,58,237,0.20)] sm:h-40 sm:w-40"
          />
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Matthew{" "}
              <span className="bg-gradient-to-br from-violet-500 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                Poncini
              </span>
            </h1>
            <p className="mt-2 text-sm font-medium text-gray-300 sm:text-base">
              Full-Stack Software Engineer — AI Infrastructure, Data Systems, and Evaluation
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-gray-500">
              San Francisco, CA
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
              {contactLinks.map(({ label, href, icon }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-gray-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-500/40 hover:bg-white/[0.07] hover:text-white"
                >
                  <span aria-hidden className="text-sm">
                    {icon}
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mt-14">
          <SectionHeading>Professional Summary</SectionHeading>
          <p className="text-sm leading-relaxed text-gray-400">
            Full-stack software engineer with an M.S. in Computer Science and B.S. in Applied
            Mathematics, focused on AI infrastructure, data-intensive applications, evaluation
            systems, and production workflows. Founder of Monstra, where I built and operate a
            full-stack platform spanning frontend interfaces, backend services, data pipelines,
            automated decision systems, external APIs, and production infrastructure. Experienced in
            Python, TypeScript, React/Next.js, PostgreSQL, ML evaluation, and designing systems that
            evolve quickly without sacrificing reliability, traceability, or maintainability.
          </p>
        </section>

        {/* Projects */}
        <section className="mt-14">
          <SectionHeading>Projects</SectionHeading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {projectLinks.map(({ label, href, icon, tag }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/[0.03] px-5 py-7 text-center transition-all duration-200 hover:-translate-y-1 hover:border-purple-500/40 hover:bg-white/[0.06] hover:shadow-[0_12px_40px_rgba(124,58,237,0.18)]"
              >
                <span className="text-3xl">{icon}</span>
                <span className="text-sm font-semibold text-gray-200">{label}</span>
                <span className="text-[11px] leading-snug text-purple-400/70">{tag}</span>
              </a>
            ))}
          </div>
          <Link
            href="/future-projects"
            className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 px-5 py-4 text-sm font-semibold text-gray-400 transition-all duration-200 hover:border-purple-500/40 hover:text-white"
          >
            Future Projects
            <span aria-hidden>→</span>
          </Link>
        </section>

        {/* Technical Skills */}
        <section className="mt-14">
          <SectionHeading>Technical Skills</SectionHeading>
          <dl className="space-y-4">
            {skills.map(({ heading, items }) => (
              <div key={heading}>
                <dt className="text-sm font-semibold text-gray-200">{heading}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-gray-400">{items}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Experience */}
        <section className="mt-14">
          <SectionHeading>Experience</SectionHeading>
          {experience.map(({ role, org, location, dates, bullets }) => (
            <article key={org}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-base font-semibold text-white">{role}</h3>
                <span className="text-sm font-semibold text-purple-400">{org}</span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 text-xs text-gray-500">
                <span>{location}</span>
                <span>{dates}</span>
              </div>
              <Bullets items={bullets} />
            </article>
          ))}
        </section>

        {/* Selected ML Projects */}
        <section className="mt-14">
          <SectionHeading>Selected Machine Learning and Evaluation Projects</SectionHeading>
          <div className="space-y-8">
            {mlProjects.map(({ title, year, bullets }) => (
              <article key={title}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-base font-semibold text-white">{title}</h3>
                  <span className="text-xs text-gray-500">{year}</span>
                </div>
                <Bullets items={bullets} />
              </article>
            ))}
          </div>
        </section>

        {/* Additional Experience */}
        <section className="mt-14">
          <SectionHeading>Additional Professional Experience</SectionHeading>
          <div className="space-y-8">
            {additionalExperience.map(({ role, org, location, dates, bullets }) => (
              <article key={role}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-base font-semibold text-white">{role}</h3>
                  <span className="text-sm font-semibold text-purple-400">{org}</span>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 text-xs text-gray-500">
                  <span>{location}</span>
                  <span>{dates}</span>
                </div>
                <Bullets items={bullets} />
              </article>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mt-14">
          <SectionHeading>Education</SectionHeading>
          <div className="space-y-6">
            {education.map(({ school, degree, location, dates, detail }) => (
              <article key={school}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-base font-semibold text-white">{school}</h3>
                  <span className="text-xs text-gray-500">{dates}</span>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="text-sm font-semibold text-gray-300">{degree}</p>
                  <span className="text-xs text-gray-500">{location}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-16 border-t border-white/10 pt-6 text-center text-xs tracking-wide text-gray-700">
          © {new Date().getFullYear()} Monstra LLC
        </footer>
      </div>
    </main>
  );
}
