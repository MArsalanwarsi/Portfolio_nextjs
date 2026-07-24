import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/portfolio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteConfig.website).toString(),
    host: new URL(siteConfig.website).host,
  };
}
