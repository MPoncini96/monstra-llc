import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FigureGallery from "./FigureGallery";

export const metadata: Metadata = {
  title: "Matthew Poncini — Full-Stack Software Engineer",
  description:
    "Portfolio of Matthew Poncini — full-stack software engineer working on AI infrastructure, data systems, and evaluation.",
};

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
    tag: "Local trading hardware",
  },
  {
    label: "hexww2.world",
    href: "https://hexww2.world",
    icon: "🌍",
    tag: "Earth on a hex globe",
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
    key: "monstra",
    roles: [
      { title: "Founder", org: "Monstra, LLC" },
      { title: "Full-Stack Software Engineer", org: "Monstra.bot" },
    ],
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
    paper: "/academic/qlora-finetuning-llama2.pdf",
    figures: [
      {
        src: "/academic/figures/qlora-finetuning-llama2--rouge.webp",
        caption:
          "ROUGE before and after fine-tuning, charted from the scores reported in the paper.",
      },
    ],
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
    paper: "/academic/forex-llm-sentiment-signals.pdf",
    figures: [
      {
        src: "/academic/figures/forex-llm-sentiment-signals--accuracy.webp",
        caption: "Directional accuracy before and after fine-tuning, by currency pair.",
      },
      {
        src: "/academic/figures/forex-llm-sentiment-signals--labels.webp",
        caption: "Reference label distribution — Neutral dominates all three pairs.",
      },
      {
        src: "/academic/figures/forex-llm-sentiment-signals--collapse.webp",
        caption:
          "On rising-price windows the tuned model scored 0%, the signature of collapse onto Neutral.",
      },
    ],
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
    paper: "/academic/open-shop-scheduling-ga-woc.pdf",
    code: [{ label: "Code", href: "/academic/open-shop-scheduling-ga-woc.ipynb" }],
    figures: [
      {
        src: "/academic/figures/open-shop-scheduling-ga-woc--gantt-15x10.webp",
        caption: "Resulting schedule for 15 jobs across 10 machines, makespan 4591.",
      },
      {
        src: "/academic/figures/open-shop-scheduling-ga-woc--gantt-10x10.webp",
        caption: "A 10-job, 10-machine schedule with makespan 370.",
      },
      {
        src: "/academic/figures/open-shop-scheduling-ga-woc--pipeline.webp",
        caption:
          "Each generation blends clones, experts, and three Wisdom of Crowds consensus crossovers.",
      },
    ],
    bullets: [
      "Built Python experiments using five independently evolving genetic-algorithm populations with different parameter configurations to solve open-shop scheduling problems.",
      "Designed fitness functions, selection and mutation workflows, experiment tracking, parameter comparison, and statistical evaluation.",
      "Aggregated independently optimized schedules through a Wisdom of Crowds approach and evaluated the effect on solution quality.",
    ],
  },
];

const academicWork = [
  {
    title: "Genetics and Wisdom of Crowds Hybrid Algorithm for the Traveling Salesman Problem",
    course: "CSE 545: Artificial Intelligence",
    term: "Fall 2025",
    summary:
      "Folded a Wisdom of Crowds aggregation step directly into the crossover operator of a genetic algorithm, so each offspring inherits high-frequency edges from the wider population as well as from its parents. Produced higher-quality tours than the prior GA-only implementation.",
    paper: "/academic/tsp-ga-wisdom-of-crowds.pdf",
    demo: { label: "Interactive Demo", href: "/tsp" },
    figures: [
      {
        src: "/academic/figures/tsp-ga-wisdom-of-crowds--convergence.webp",
        caption:
          "Min, average, and max tour distance converging over generations.",
      },
      {
        src: "/academic/figures/tsp-ga-wisdom-of-crowds--tour.webp",
        caption:
          "A completed offspring tour over the city set.",
      },
      {
        src: "/academic/figures/tsp-ga-wisdom-of-crowds--operators.webp",
        caption:
          "Average distance by operator — aggregate, crossover, and mutation variants.",
      },
    ],
    code: [
      { label: "Algorithm", href: "/academic/tsp-ga-wisdom-of-crowds.ipynb" },
      { label: "Driver", href: "/academic/tsp-ga-wisdom-of-crowds-main.ipynb" },
    ],
  },
  {
    title: "Unsupervised Clustering and Pattern Recognition of a 9-mer Peptide Dataset",
    course: "CSE 632: Data Mining",
    term: "Fall 2025",
    summary:
      "Clustered one million 9-mer peptides drawn from human, viral, bacterial, and cancer sources using HDBSCAN and UMAP. Found clear physicochemical structure, but none of the 229 engineered features could reliably recover a peptide's biological origin.",
    paper: "/academic/peptide-clustering.pdf",
    figures: [
      {
        src: "/academic/figures/peptide-clustering--clusters.webp",
        caption:
          "UMAP + HDBSCAN recovers three clear structural clusters.",
      },
      {
        src: "/academic/figures/peptide-clustering--by-source.webp",
        caption:
          "The same projection colored by biological source shows no separation — the negative result.",
      },
      {
        src: "/academic/figures/peptide-clustering--subclusters.webp",
        caption:
          "Sub-clustering within each top-level cluster.",
      },
    ],
  },
  {
    title: "Classification of a Trojan Horse Data Set",
    course: "CSE 632: Data Mining",
    term: "Fall 2025",
    summary:
      "Built and compared six binary classifiers over ~160k web-traffic flows with 85 features, then stacked the top performers into an ensemble to separate trojan from benign traffic.",
    paper: "/academic/trojan-horse-classification.pdf",
    figures: [
      {
        src: "/academic/figures/trojan-horse-classification--roc-rf.webp",
        caption:
          "Random Forest ROC, AUC 0.767 — the strongest single classifier.",
      },
      {
        src: "/academic/figures/trojan-horse-classification--roc-ensemble.webp",
        caption:
          "Ensemble stacking ROC, AUC 0.722.",
      },
      {
        src: "/academic/figures/trojan-horse-classification--pca.webp",
        caption:
          "PCA cumulative variance across the 85 flow features.",
      },
    ],
    code: [{ label: "Code", href: "/academic/trojan-horse-classification.ipynb" }],
  },
  {
    title:
      "Simulated Annealing and Niching Genetic Algorithms for the Bottleneck Traveling Salesman Problem",
    course: "CSE 620: Evolutionary Computation",
    term: "Fall 2025",
    summary:
      "Surveyed exact and approximate approaches to the bottleneck TSP, then compared simulated annealing against niching genetic algorithms on an objective whose landscape is dominated by plateaus.",
    paper: "/academic/bottleneck-tsp-sa-niching-ga.pdf",
    figures: [
      {
        src: "/academic/figures/bottleneck-tsp-sa-niching-ga--bottleneck.webp",
        caption:
          "Average bottleneck edge length against problem size for every algorithm tested.",
      },
      {
        src: "/academic/figures/bottleneck-tsp-sa-niching-ga--runtime.webp",
        caption:
          "Runtime against problem size, log scale.",
      },
      {
        src: "/academic/figures/bottleneck-tsp-sa-niching-ga--distribution.webp",
        caption:
          "Bottleneck distribution by algorithm at 100 cities.",
      },
    ],
  },
  {
    title: "Niching Genetic Algorithm Experimentation",
    course: "CSE 620: Evolutionary Computation",
    term: "Fall 2025",
    summary:
      "Applied a standard GA, deterministic crowding, and parallel hillclimbing to multimodal benchmark functions, analyzing convergence, population distribution, and each method's ability to hold multiple optima.",
    paper: "/academic/niching-ga-experimentation.pdf",
    figures: [
      {
        src: "/academic/figures/niching-ga-experimentation--baseline-collapse.webp",
        caption:
          "Baseline GA collapses its whole population onto a single peak of M1.",
      },
      {
        src: "/academic/figures/niching-ga-experimentation--crowding-spread.webp",
        caption:
          "Deterministic crowding holds population across all five peaks.",
      },
      {
        src: "/academic/figures/niching-ga-experimentation--fitness.webp",
        caption:
          "Fitness convergence under deterministic crowding.",
      },
    ],
  },
  {
    title: "Gradient Descent Optimization Methods",
    course: "CSE 620: Evolutionary Computation",
    term: "Fall 2025",
    summary:
      "Implemented and compared vanilla gradient descent, Newton's method, AdaGrad, and Adam across three-dimensional surfaces at varying starting points and learning rates.",
    paper: "/academic/gradient-descent-optimization.pdf",
    figures: [
      {
        src: "/academic/figures/gradient-descent-optimization--banana.webp",
        caption:
          "Descent path across the Rosenbrock banana valley.",
      },
      {
        src: "/academic/figures/gradient-descent-optimization--bowl.webp",
        caption:
          "Descent path on the bowl function.",
      },
      {
        src: "/academic/figures/gradient-descent-optimization--adam.webp",
        caption:
          "Adam: 3D path, contour path, convergence, and parameter evolution.",
      },
    ],
  },
  {
    title: "Trie Data Structure for Automatic Search Completion",
    course: "CSE 503: Data Structures and Operating Systems",
    term: "Summer 2024",
    summary:
      "Designed a trie-backed autocomplete structure and evaluated its lookup and insertion behavior against the demands of interactive search.",
    paper: "/academic/trie-search-completion.pdf",
    figures: [
      {
        src: "/academic/figures/trie-search-completion--prefix-ban.webp",
        caption:
          "The prefix ban expands to every stored completion.",
      },
      {
        src: "/academic/figures/trie-search-completion--prefix-grap.webp",
        caption:
          "grap returns grape, grapes, and graph.",
      },
      {
        src: "/academic/figures/trie-search-completion--typo.webp",
        caption:
          "A misspelled query resolves to the nearest stored word.",
      },
    ],
  },
  {
    title: "Round Robin CPU Scheduling",
    course: "CSE 503: Data Structures and Operating Systems",
    term: "Summer 2024",
    summary:
      "Implemented a round-robin CPU scheduler in C++ and analyzed how quantum size drives turnaround and waiting time.",
    paper: "/academic/round-robin-cpu-scheduling.pdf",
    figures: [
      {
        src: "/academic/figures/round-robin-cpu-scheduling--timeline.webp",
        caption:
          "Round-robin timeline: three jobs cycling through 5 ms quanta.",
      },
      {
        src: "/academic/figures/round-robin-cpu-scheduling--trace.webp",
        caption:
          "Scheduler trace and wait-time summary.",
      },
      {
        src: "/academic/figures/round-robin-cpu-scheduling--scale.webp",
        caption:
          "1,001 jobs completed, average wait 28.8 s.",
      },
    ],
    code: [{ label: "C++ Source", href: "/academic/round-robin-cpu-scheduling.cpp" }],
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
    <h2 className="mb-6 border-b border-gold/30 pb-2 text-xl font-semibold tracking-tight text-white">
      {children}
    </h2>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-parchment/70">
          <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ResourceLinks({
  paper,
  code,
  demo,
}: {
  paper: string;
  code?: { label: string; href: string }[];
  demo?: { label: string; href: string };
}) {
  const links = [{ label: "Paper", href: paper }, ...(code ?? [])];
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {demo && (
        <Link
          href={demo.href}
          className="rounded-full border border-gold bg-gold/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-gold transition-all duration-200 hover:bg-gold/25"
        >
          {demo.label}
        </Link>
      )}
      {links.map(({ label, href }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-purple-mid/50 bg-surface px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-parchment transition-all duration-200 hover:border-gold/60 hover:bg-surface-2 hover:text-gold"
        >
          {label}
        </a>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-ink px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        {/* Hero */}
        <header className="flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-8 sm:text-left">
          <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-2xl border-2 border-gold/50 shadow-[0_12px_40px_rgba(42,18,80,0.65)] sm:h-72 sm:w-72">
            <Image
              src="/profile.jpg"
              alt="Matthew Poncini"
              fill
              priority
              sizes="(min-width: 640px) 26rem, 24rem"
              className="scale-[1.45] object-cover origin-[54%_59%]"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Matthew Poncini
            </h1>
            <p className="mt-2 text-sm font-medium text-parchment sm:text-base">
              Founder, Monstra, LLC
              <span aria-hidden className="mx-2 text-gold/60">
                ·
              </span>
              Full-Stack Software Engineer, Monstra.bot
            </p>
            <p className="mt-1 text-sm text-parchment/70">
              AI Infrastructure, Data Systems, and Evaluation
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-parchment/50">
              San Francisco, CA
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
              {contactLinks.map(({ label, href, icon }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 rounded-full border border-purple-mid/50 bg-surface px-4 py-2 text-xs font-semibold text-parchment transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/60 hover:bg-surface-2 hover:text-gold"
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
          <p className="text-sm leading-relaxed text-parchment/70">
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
                className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-purple-mid/40 bg-surface px-5 py-7 text-center transition-all duration-200 hover:-translate-y-1 hover:border-gold/60 hover:bg-surface-2 hover:shadow-[0_12px_40px_rgba(42,18,80,0.7)]"
              >
                <span className="text-3xl">{icon}</span>
                <span className="text-sm font-semibold text-parchment">{label}</span>
                <span className="text-[11px] leading-snug text-gold-soft/80">{tag}</span>
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

        {/* Technical Skills */}
        <section className="mt-14">
          <SectionHeading>Technical Skills</SectionHeading>
          <dl className="space-y-4">
            {skills.map(({ heading, items }) => (
              <div key={heading}>
                <dt className="text-sm font-semibold text-parchment">{heading}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-parchment/70">{items}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Experience */}
        <section className="mt-14">
          <SectionHeading>Experience</SectionHeading>
          {experience.map(({ key, roles, location, dates, bullets }) => (
            <article key={key}>
              {roles.map(({ title, org }) => (
                <div
                  key={org}
                  className="flex flex-wrap items-baseline justify-between gap-x-4"
                >
                  <h3 className="text-base font-semibold text-white">{title}</h3>
                  <span className="text-sm font-semibold text-gold">{org}</span>
                </div>
              ))}
              <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 text-xs text-parchment/50">
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
            {mlProjects.map(({ title, year, bullets, paper, code, figures }) => (
              <article key={title}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-base font-semibold text-white">{title}</h3>
                  <span className="text-xs text-parchment/50">{year}</span>
                </div>
                <Bullets items={bullets} />
                <FigureGallery figures={figures} label={title} />
                <ResourceLinks paper={paper} code={code} />
              </article>
            ))}
          </div>
        </section>

        {/* Academic Work */}
        <section className="mt-14">
          <SectionHeading>Academic Work</SectionHeading>
          <p className="-mt-2 mb-6 text-sm leading-relaxed text-parchment/70">
            Selected papers and code from my M.S. in Computer Science at the University of
            Louisville and prior coursework.
          </p>
          <div className="space-y-8">
            {academicWork.map(({ title, course, term, summary, paper, code, figures, demo }) => (
              <article key={paper}>
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="text-xs font-semibold text-gold">{course}</span>
                  <span className="text-xs text-parchment/50">{term}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-parchment/70">{summary}</p>
                <FigureGallery figures={figures} label={title} />
                <ResourceLinks paper={paper} code={code} demo={demo} />
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
                  <span className="text-sm font-semibold text-gold">{org}</span>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 text-xs text-parchment/50">
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
                  <span className="text-xs text-parchment/50">{dates}</span>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="text-sm font-semibold text-parchment">{degree}</p>
                  <span className="text-xs text-parchment/50">{location}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-parchment/70">{detail}</p>
              </article>
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
