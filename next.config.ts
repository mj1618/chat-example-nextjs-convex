import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webp: {
    preset: "default",
    quality: 100,
  },
  images: {
    domains: ["via.placeholder.com", "majestic-mammoth-169.convex.cloud"],
  },
  /* config options here */
};

export default nextConfig;
