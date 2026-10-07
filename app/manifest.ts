import type { MetadataRoute } from "next";
import { seo, siteConfig } from "@/data/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#17110c",
    theme_color: "#17110c",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
