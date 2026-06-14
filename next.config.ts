import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "khm.next.erxes.io",
      },
    ],
  },
};

export default nextConfig;
