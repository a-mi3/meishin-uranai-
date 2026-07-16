import type { NextConfig } from "next";

const BASE_PATH = "/app";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
};

export default nextConfig;
