import type { Metadata } from "next";
import { Nunito_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { clinica, demo, modeloPadrao } from "@/lib/site";

const corpo = Nunito_Sans({ subsets: ["latin"], variable: "--font-corpo" });
const titulo = Outfit({ subsets: ["latin"], variable: "--font-titulo" });

const modelo = modeloPadrao;

export const metadata: Metadata = {
  metadataBase: new URL(clinica.url),
  title: { default: `${modelo.nome} | ${modelo.tagline}`, template: `%s | ${modelo.nome}` },
  description: modelo.descricao,
  openGraph: { title: modelo.nome, description: modelo.descricao, url: clinica.url, siteName: modelo.nome, locale: "pt_BR", type: "website" },
  alternates: { canonical: "/" },
  // Enquanto for demonstração, a clínica fictícia não deve aparecer no Google.
  robots: demo.ativa ? { index: false, follow: false } : undefined,
};

// Dados estruturados de negócio local (ajudam o Google a exibir a clínica de um cliente real).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": modelo.tipoSchema,
  name: modelo.nome,
  description: modelo.descricao,
  url: clinica.url,
  email: clinica.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: clinica.address.street,
    addressLocality: clinica.address.city,
    addressRegion: clinica.address.region,
    postalCode: clinica.address.zip,
    addressCountry: "BR",
  },
  openingHours: clinica.hours.map((h) => h.schema),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${corpo.variable} ${titulo.variable}`}>
      <body className="font-sans text-slate-800 antialiased">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
