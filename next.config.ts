import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**", 
      },
      {
        protocol: "http", 
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
