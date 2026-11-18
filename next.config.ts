import type { NextConfig } from "next";

// monstra.llc now forwards to mjponcini.com. These redirects are temporary
// (307) so the old domain can be reused later without browsers caching the move.
const OLD_HOSTS = "(www\\.)?monstra\\.llc";
const NEW_ORIGIN = "https://mjponcini.com";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old portfolio URL on the old domain -> new About page on the new domain
      {
        source: "/MatthewPoncini",
        has: [{ type: "host", value: OLD_HOSTS }],
        destination: `${NEW_ORIGIN}/AboutMe`,
        permanent: false,
      },
      // Everything else on the old domain -> same path on the new domain
      {
        source: "/:path*",
        has: [{ type: "host", value: OLD_HOSTS }],
        destination: `${NEW_ORIGIN}/:path*`,
        permanent: false,
      },
      // www.mjponcini.com -> mjponcini.com
      {
        source: "/:path*",
        has: [{ type: "host", value: "www\\.mjponcini\\.com" }],
        destination: `${NEW_ORIGIN}/:path*`,
        permanent: true,
      },
      // Old path on any host (bookmarks, preview URLs) -> new path
      {
        source: "/MatthewPoncini",
        destination: "/AboutMe",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
