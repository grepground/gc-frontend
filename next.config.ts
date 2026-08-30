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
        hostname: "grepground.org", // For the live environment
      },
      {
        protocol: "https",
        hostname: "*.grepground.org", // For subdomains
      },
    ],
  },
};
export default nextConfig;
