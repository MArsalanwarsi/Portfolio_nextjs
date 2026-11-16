import type { MetadataRoute } from "next";
import { seo, siteConfig } from "@/data/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#202020",
    theme_color: "#202020",
    icons: [{ src: "/ma-app-icon.png", sizes: "512x512", type: "image/png" }],
  };
}
