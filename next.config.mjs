/** @type {import('next').NextConfig} */
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  webpack(config) {
    config.module.rules = config.module.rules.filter(
      (rule) => !rule.test?.test?.(".svg")
    );

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.(js|ts)x?$/,
      use: ["@svgr/webpack"],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      src: path.resolve(__dirname, "src"),
    };

    return config;
  },
};

export default nextConfig;
