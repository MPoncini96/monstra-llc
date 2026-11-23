import type { Metadata } from "next";
import BannerBrand from "./BannerBrand";
import "./globals.css";

const description =
  "Matthew Poncini, full-stack software engineer working on AI infrastructure, data systems, and evaluation. Projects, research papers, and experience.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mjponcini.com"),
  title: "Matthew Poncini | Full-Stack Software Engineer",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Matthew Poncini | Full-Stack Software Engineer",
    description,
    url: "https://mjponcini.com",
    siteName: "Matthew Poncini",
    type: "website",
  },
};

const navLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Research", href: "/#research" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col bg-ink font-sans">
        <header className="sticky top-0 z-50 border-b-2 border-gold/40 bg-purple-deep/95 backdrop-blur">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-x-4 px-4 py-3 sm:px-6 sm:py-4">
            <BannerBrand />
            <nav aria-label="Sections">
              <ul className="flex items-center gap-x-3 sm:gap-x-6">
                {navLinks.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-[11px] font-semibold uppercase tracking-wider text-gold-soft/80 transition-colors hover:text-gold sm:text-xs sm:tracking-widest"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
