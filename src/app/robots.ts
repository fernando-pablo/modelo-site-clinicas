import type { MetadataRoute } from "next";

// Site modelo (clínica fictícia):
// - LinkedInBot liberado para gerar a prévia do link no LinkedIn.
// - Demais robôs (incluindo o Google) bloqueados para não indexar uma clínica que não existe.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "LinkedInBot",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
  };
}
