
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  register: true,         // register the PWA service worker
  disable: process.env.NODE_ENV === "development", // Disable PWA in development
});

/** @type {import("next").NextConfig} */
export default withPWA({
  reactStrictMode: true,
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',

      },
    ],
  }
});