import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "grepground.org", // Canlı ortam için
      },
      {
        protocol: "https",
        hostname: "*.grepground.org", // Subdomain'ler için
      },
    ],
  },
};
export default nextConfig;
