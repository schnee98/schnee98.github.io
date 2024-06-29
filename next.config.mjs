/** @type {import('next').NextConfig} */
const prefix = process.env.NODE_ENV === "production" ? "https://schnee98.github.io/" : "";

const nextConfig = {
  output: "export",
  assetPrefix: prefix,
};

export default nextConfig;
