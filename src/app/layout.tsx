import type { Metadata } from "next";
import Link from "next/link";
import BannerBrand from "./BannerBrand";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matthew Poncini",
  description:
    "Matthew Poncini, full-stack software engineer. Projects in quantitative trading research, genetic algorithms, 3D home visualization, and games, plus published research papers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-ink font-sans">
        <header className="sticky top-0 z-50 border-b-2 border-gold/40 bg-purple-deep">
          <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-5">
            <BannerBrand />
            <Link
              href="/AboutMe"
              className="text-xs font-semibold uppercase tracking-widest text-gold-soft/75 transition-colors hover:text-gold"
            >
              Portfolio
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
