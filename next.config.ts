import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactCompiler: true,
  images: {
    localPatterns: [
      {
        pathname: "/header-photo.png",
        search: "",
      },
      {
        pathname: "/profile-photo.jpg",
        search: "",
      },
      {
        pathname: "/profile-photo.svg",
        search: "",
      },
      {
        pathname: "/projects/**",
        search: "",
      },
    ],
    minimumCacheTTL: 31_536_000,
    qualities: [75],
  },
  experimental: {
    turbopackFileSystemCacheForBuild: true,
  },
};

export default nextConfig;
