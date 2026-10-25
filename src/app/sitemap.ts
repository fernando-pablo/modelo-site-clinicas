import type { MetadataRoute } from "next";
import { clinica } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: clinica.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
