const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        // for serving images from /public
        protocol: process.env.NEXT_PUBLIC_BASE_URL?.startsWith("https") ? "https" : "http",
        hostname: process.env.NEXT_PUBLIC_BASE_URL
          ? process.env.NEXT_PUBLIC_BASE_URL.replace(/^https?:\/\//, "")
          : "https://lumoria-studio.pl", // fallback to your production domain
      },
      {
        // for local file uploads (Medusa backend)
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
          ? process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL.replace("https://", "")
          : "backend.lumoria-studio.pl", // fallback
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      ...(process.env.NEXT_PUBLIC_MINIO_ENDPOINT
        ? [
          {
            protocol: "https",
            hostname: process.env.NEXT_PUBLIC_MINIO_ENDPOINT,
          },
        ]
        : []),
    ],
  },
  serverRuntimeConfig: {
    port: process.env.PORT || 3000,
  },
}

module.exports = nextConfig
