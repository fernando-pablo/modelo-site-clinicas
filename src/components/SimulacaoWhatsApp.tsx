import { useEffect, useRef, useState } from "react";
import { demo, whatsappLink, type Modelo } from "@/lib/site";
import { EVENTO_SIMULACAO } from "@/lib/whatsapp";
import { IconeWhatsApp } from "./Icone";

// Mostra, só na demonstração, como a mensagem chegaria no WhatsApp da recepção.
export default function SimulacaoWhatsApp({ modelo }: { modelo: Modelo }) {
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [resposta, setResposta] = useState(false);
  const fecharRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function abrir(e: Event) {
      setMensagem((e as CustomEvent<string>).detail);
      setResposta(false);
    }
    window.addEventListener(EVENTO_SIMULACAO, abrir);
    return () => window.removeEventListener(EVENTO_SIMULACAO, abrir);
  }, []);

  useEffect(() => {
    if (!mensagem) return;
    fecharRef.current?.focus();
    const t = setTimeout(() => setResposta(true), 1400);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMensagem(null);
    window.addEventListener("keydown", esc);
    return () => { clearTimeout(t); window.removeEventListener("keydown", esc); };
  }, [mensagem]);

  if (!mensagem) return null;
  const hora = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/70 p-4" onClick={() => setMensagem(null)}>
      <div role="dialog" aria-modal="true" aria-labelledby="sim-titulo"
        className="flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
          <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 font-semibold">
            {modelo.nome.charAt(0)}
          </span>
          <div className="min-w-0">
            <p id="sim-titulo" className="truncate font-semibold">Recepção · {modelo.nome}</p>
            <p className="text-xs text-white/75">simulação da conversa</p>
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto bg-[#ECE5DD] p-4">
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[#DCF8C6] px-3 py-2 text-sm text-slate-800 shadow-sm">
            <p className="whitespace-pre-line">{mensagem}</p>
            <p className="mt-1 text-right text-[11px] text-slate-500">{hora} ✓✓</p>
          </div>
          {resposta ? (
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-sm text-slate-800 shadow-sm">
              <p>Olá! Recebemos seu pedido 😊 Vamos conferir a agenda e já confirmamos o horário com você.</p>
              <p className="mt-1 text-right text-[11px] text-slate-500">{hora}</p>
            </div>
          ) : (
            <p className="text-xs text-slate-500" aria-live="polite">digitando...</p>
          )}
        </div>

        <div className="space-y-3 border-t border-slate-200 p-4">
          <p className="text-sm text-slate-600">
            Esta é uma demonstração: a mensagem não foi enviada. No site de uma clínica de verdade, ela abre
            direto no WhatsApp da recepção, já preenchida.
          </p>
          <div className="flex flex-wrap gap-2">
            <a href={whatsappLink(demo.mensagemInteresse)} target="_blank" rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-95">
              <IconeWhatsApp /> Quero um site assim
            </a>
            <button ref={fecharRef} type="button" onClick={() => setMensagem(null)}
              className="rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-500">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
