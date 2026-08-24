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
      <body className="min-h-full flex flex-col bg-ink font-sans">
        <header className="sticky top-0 z-50 border-b-2 border-gold/40 bg-purple-deep">
          <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-5">
            <Link
              href="/"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              <span className="text-gold">Monstra</span>, LLC
            </Link>
            <Link
              href="/future-projects"
              className="text-xs font-semibold uppercase tracking-widest text-gold-soft/75 transition-colors hover:text-gold"
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
