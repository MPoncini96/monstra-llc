import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matthew Poncini — Full-Stack Software Engineer",
  description:
    "Portfolio of Matthew Poncini — full-stack software engineer working on AI infrastructure, data systems, and evaluation.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
