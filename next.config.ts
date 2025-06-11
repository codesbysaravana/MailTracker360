import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["ik.imagekit.io"], // Add your image CDN domains
  },
  typescript: {
    ignoreBuildErrors: false, // Set to true only during rapid prototyping
  },
};

export default nextConfig;
