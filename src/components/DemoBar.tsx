import { useEffect, useRef } from "react";
import { demo, modelos, whatsappLink } from "@/lib/site";

type Props = { modeloId: string; onTrocar: (id: string) => void };

// Faixa que só existe na demonstração: explica que é um modelo e deixa trocar o tipo de clínica.
export default function DemoBar({ modeloId, onTrocar }: Props) {
  const grupoRef = useRef<HTMLDivElement>(null);

  // No celular os botões rolam de lado: mantém o modelo escolhido sempre visível.
  useEffect(() => {
    const grupo = grupoRef.current;
    const ativo = grupo?.querySelector<HTMLElement>('[aria-checked="true"]');
    if (grupo && ativo) grupo.scrollLeft = ativo.offsetLeft - grupo.offsetLeft - 16;
  }, [modeloId]);

  if (!demo.ativa) return null;

  return (
    <div className="bg-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2.5 text-sm lg:flex-row lg:items-center lg:gap-4">
        <div className="flex items-center justify-between gap-3 lg:contents">
          <p className="text-slate-300 lg:shrink-0">
            Site modelo da <strong className="font-semibold text-white">{demo.agencia}</strong>
            <span className="hidden sm:inline">. Veja como ficaria para:</span>
          </p>
          <a
            href={whatsappLink(demo.mensagemInteresse)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800 hover:bg-white lg:order-last lg:ml-auto"
          >
            Quero um site assim
          </a>
        </div>
        <div ref={grupoRef} role="radiogroup" aria-label="Tipo de clínica" className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-0.5 lg:mx-0 lg:px-0">
          {modelos.map((m) => {
            const ativo = m.id === modeloId;
            return (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={ativo}
                onClick={() => onTrocar(m.id)}
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  ativo ? "bg-white text-slate-900" : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                }`}
              >
                {m.rotulo}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
