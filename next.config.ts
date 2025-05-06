const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/frs-bs",
};

module.exports = nextConfig;
