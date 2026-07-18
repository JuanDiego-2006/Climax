import type { NextConfig } from "next";

const API_URL = process.env.API_URL ?? "http://localhost:3001";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.85"],

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
