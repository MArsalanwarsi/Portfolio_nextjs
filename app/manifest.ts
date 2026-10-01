import type { MetadataRoute } from "next";
import { seo, siteConfig } from "@/data/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: seo.description,
    id: "/",
    scope: "/",
    start_url: "/",
    display: "standalone",
    background_color: "#121212",
    theme_color: "#121212",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
