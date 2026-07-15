/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  serverExternalPackages: ["pdf-parse", "@napi-rs/canvas"],

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "a1kjcvc8nmndpsqp.public.blob.vercel-storage.com",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
};

module.exports = nextConfig;
