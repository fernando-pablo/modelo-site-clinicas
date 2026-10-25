import type { MetadataRoute } from "next";
import { clinica, demo } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Na demonstração, pede aos buscadores para não indexar a clínica fictícia.
  if (demo.ativa) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${clinica.url}/sitemap.xml` };
}
