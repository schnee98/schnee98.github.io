/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      "/": { page: "/" },
    };
  },
};

export default nextConfig;
