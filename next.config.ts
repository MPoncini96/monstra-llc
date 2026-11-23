import type { NextConfig } from "next";

// The site is built as plain static files and hosted on GitHub Pages
// (see .github/workflows/pages.yml). Static exports can't use next.config
// redirects, so:
// - /MatthewPoncini -> /AboutMe is a small HTML page in public/MatthewPoncini/
// - www.mjponcini.com -> mjponcini.com is handled by GitHub Pages
// - monstra.llc -> mjponcini.com is URL forwarding at the domain registrar
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
