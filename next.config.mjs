/** @type {import('next').NextConfig} */
const nextConfig = {
  //   images: {
  //     domains: [`avatars.google.com`],
  //   },
  experimental: {
    urlImports: ["https://api.nal.usda.gov"],
  },
  output: "standalone",
};

export default nextConfig;
