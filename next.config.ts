import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: '/reservas', destination: '/', permanent: true }]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.thum.io',
        pathname: '/get/**',
      },
    ],
  },
};

export default nextConfig;
