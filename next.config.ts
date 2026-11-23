import type { NextConfig } from "next";

// The site is built as plain static files and hosted on GitHub Pages
// (see .github/workflows/pages.yml). Static exports can't use next.config
// redirects, so:
// - /AboutMe and /MatthewPoncini -> / are small HTML pages in public/
// - www.mjponcini.com -> mjponcini.com is handled by GitHub Pages
// - the old portfolio domain forwards to mjponcini.com at the domain registrar
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
