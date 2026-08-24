import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matthew Poncini — Full-Stack Software Engineer",
  description:
    "Portfolio of Matthew Poncini — full-stack software engineer working on AI infrastructure, data systems, and evaluation.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0a0a0f] font-sans">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/85 backdrop-blur">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight text-white">
              <span className="bg-gradient-to-br from-violet-500 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                Monstra
              </span>
              , LLC
            </Link>
            <Link
              href="/future-projects"
              className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 transition-colors hover:text-purple-400"
            >
              Future Projects
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
