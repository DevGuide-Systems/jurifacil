import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-expect-error: appDir ainda não está tipado no NextConfig
    appDir: true,
  },
  output: "standalone",
};

export default nextConfig;
