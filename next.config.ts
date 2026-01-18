import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone mode for smaller deployment and faster cold starts
  output: "standalone",
  images: {
    remotePatterns: [
      { hostname: 'avatars.githubusercontent.com' },
      { hostname: 'lh3.googleusercontent.com' },
    ],
  },
  // Increase serverless function timeout
  experimental: {
    serverMinification: true,
  },
};

export default nextConfig;
