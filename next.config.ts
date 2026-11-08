import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Emit /about/index.html instead of about.html, so Apache/LiteSpeed doesn't 403 on the bare /about directory.
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
