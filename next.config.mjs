/** @type {import('next').NextConfig} */
const prefix = process.env.NODE_ENV === "production" ? "https://schnee98.github.io/" : "";

const nextConfig = {
  output: "export",
  assetPrefix: prefix,
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      "/": { page: "/" },
    };
  },
};

export default nextConfig;
