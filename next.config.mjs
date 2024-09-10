import createNextIntlPlugin from "next-intl/plugin";
import "./src/env.js"

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  }
};

export default withNextIntl(nextConfig);
