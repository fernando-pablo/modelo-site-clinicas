import type { IconName } from "@/lib/site";

// Ícones desenhados em SVG (traço simples), para não depender de bibliotecas nem de imagens externas.
const caminhos: Record<IconName, React.ReactNode> = {
  estetoscopio: <><path d="M6 3v6a5 5 0 0 0 10 0V3" /><path d="M11 14v2a5 5 0 0 0 10 0v-2" /><circle cx="21" cy="12" r="2" /></>,
  crianca: <><circle cx="12" cy="6" r="3" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /><path d="M9 14l3 2 3-2" /></>,
  coracao: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  mulher: <><circle cx="12" cy="8" r="5" /><path d="M12 13v8M9 18h6" /></>,
  maca: <><path d="M12 7c-3-2-8-1-8 5 0 4 3 9 5 9 1.5 0 2-1 3-1s1.5 1 3 1c2 0 5-5 5-9 0-6-5-7-8-5z" /><path d="M12 7c0-2 1-4 3-4" /></>,
  dente: <path d="M7 3c-3 0-4 3-3.5 6 .5 2.5 1.5 4 2 7 .4 2.6 1 5 2.5 5s1.5-4 3-4 1.5 4 3 4 2.1-2.4 2.5-5c.5-3 1.5-4.5 2-7C21 6 20 3 17 3c-2 0-3 1-5 1S9 3 7 3z" />,
  alinhador: <><path d="M3 10c3-3 15-3 18 0" /><path d="M3 14c3 3 15 3 18 0" /><path d="M7 9v6M12 8.5v7M17 9v6" /></>,
  implante: <><path d="M8 3h8l-1 6H9z" /><path d="M10 9v3h4V9" /><path d="M10 13h4M10 16h4M11 19h2" /></>,
  brilho: <><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" /><path d="M19 3v4M17 5h4" /></>,
  mente: <><path d="M12 21v-4" /><path d="M7 17a5 5 0 0 1-1-9.5A6 6 0 0 1 18 8a5 5 0 0 1-1 9z" /><path d="M10 11c1 1 3 1 4 0" /></>,
  casal: <><circle cx="8" cy="7" r="3" /><circle cx="16" cy="7" r="3" /><path d="M2 21v-2a6 6 0 0 1 10-4.5A6 6 0 0 1 22 19v2" /></>,
  cerebro: <><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1z" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1" /></>,
  pele: <><circle cx="12" cy="12" r="9" /><circle cx="9" cy="10" r="1" /><circle cx="14" cy="14" r="1" /><circle cx="15" cy="9" r="0.5" /></>,
  rosto: <><circle cx="12" cy="12" r="9" /><path d="M8.5 14.5c1.8 2 5.2 2 7 0" /><path d="M9 9.5h.01M15 9.5h.01" /></>,
  corpo: <><circle cx="12" cy="4" r="2" /><path d="M8 22l1-9-3-4 6-1 6 1-3 4 1 9" /></>,
  laser: <><path d="M4 20L14 10" /><path d="M14 10l3-3" /><path d="M18 3v3M21 6h-3M16 12l2 2M12 16l2 2" /></>,
};

export default function Icone({ nome, className = "h-6 w-6" }: { nome: IconName; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor"
      strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      {caminhos[nome]}
    </svg>
  );
}

export function IconeWhatsApp({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}
