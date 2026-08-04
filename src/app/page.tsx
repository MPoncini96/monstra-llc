import Link from "next/link";

const links = [
  {
    label: "Monstra.bot",
    href: "https://monstra.bot",
    icon: "🤖",
    tag: "Automation",
  },
  {
    label: "Monstra.pro",
    href: "https://monstra.pro",
    icon: "⚡",
    tag: "Professional",
  },
  {
    label: "Monstra.study",
    href: "https://monstra.study",
    icon: "📚",
    tag: "Learning",
  },
  {
    label: "Monstra.guide",
    href: "https://monstra.guide",
    icon: "🧭",
    tag: "Resources",
  },
  {
    label: "Books",
    href: "https://monstra.llc/books",
    icon: "📖",
    tag: "Library",
  },
  {
    label: "Financials",
    href: "https://monstra.llc/financials",
    icon: "💰",
    tag: "Finance",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-6 py-16">
      {/* Header */}
      <header className="mb-14 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white">
          <span className="bg-gradient-to-br from-violet-500 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Monstra
          </span>
          .LLC
        </h1>
        <p className="mt-3 text-sm uppercase tracking-widest text-gray-500">
          Our Network
        </p>
      </header>

      {/* Button grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl sm:grid-cols-3">
        {links.map(({ label, href, icon, tag }) => (
          <Link
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-8 text-center transition-all duration-200 hover:-translate-y-1 hover:border-purple-500/40 hover:bg-white/[0.06] hover:shadow-[0_12px_40px_rgba(124,58,237,0.18)]"
          >
            <span className="text-3xl">{icon}</span>
            <span className="text-sm font-semibold text-gray-200">{label}</span>
            <span className="text-[11px] uppercase tracking-widest text-purple-400/70">
              {tag}
            </span>
          </Link>
        ))}
      </div>

      <footer className="mt-16 text-xs tracking-wide text-gray-700">
        © {new Date().getFullYear()} Monstra LLC
      </footer>
    </main>
  );
}
