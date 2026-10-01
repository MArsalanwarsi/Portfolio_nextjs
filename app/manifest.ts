import type { MetadataRoute } from "next";
import { seo, siteConfig } from "@/data/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [{ src: "/icon.png", sizes: "1254x1254", type: "image/png" }],
  };
}
