/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  serverExternalPackages: ['@prisma/client', '@prisma/engines'],
  // Disable static optimization to prevent database access during build
  experimental: {
    isrMemoryCacheSize: 0,
  },
};

export default nextConfig;
