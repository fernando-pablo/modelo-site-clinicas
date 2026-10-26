import { abrirWhatsAppClinica } from "@/lib/whatsapp";
import { demo, mensagemClinica, whatsappLink, type Modelo } from "@/lib/site";
import { IconeWhatsApp } from "./Icone";

export default function BotaoWhatsApp({ modelo }: { modelo: Modelo }) {
  return (
    <a
      href={whatsappLink(mensagemClinica(`Olá! Vim pelo site da ${modelo.nome} e gostaria de atendimento.`))}
      onClick={(e) => { if (demo.ativa) { e.preventDefault(); abrirWhatsAppClinica(mensagemClinica(`Olá! Vim pelo site da ${modelo.nome} e gostaria de atendimento.`)); } }}
      target="_blank" rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
    >
      <IconeWhatsApp className="h-7 w-7" />
    </a>
  );
}
