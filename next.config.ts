import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/portfolio_for_you' : '',
  assetPrefix: isProd ? '/portfolio_for_you/' : '',
  // Skip API routes for static export
  experimental: {
    // This allows us to build even with dynamic routes
  },
};

export default nextConfig;
