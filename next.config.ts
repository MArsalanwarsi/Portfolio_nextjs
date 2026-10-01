import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      {
        pathname: "/header-photo.webp",
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
