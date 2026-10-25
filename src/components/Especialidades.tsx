import type { Modelo } from "@/lib/site";
import Icone from "./Icone";

type Props = { modelo: Modelo; onVerEquipe: (especialidadeId: string) => void };

export default function Especialidades({ modelo, onVerEquipe }: Props) {
  return (
    <section id="especialidades" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">Especialidades</h2>
          <p className="mt-3 text-lg text-slate-600">Escolha uma área para conhecer quem atende.</p>
        </div>

        <ul className="mt-10 grid gap-x-10 md:grid-cols-2">
          {modelo.especialidades.map((esp) => (
            <li key={esp.id} className="border-t border-slate-200">
              <button
                type="button"
                onClick={() => onVerEquipe(esp.id)}
                className="group flex w-full items-start gap-4 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white">
                  <Icone nome={esp.icone} />
                </span>
                <span className="flex-1">
                  <span className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-display text-xl font-semibold text-slate-900">{esp.titulo}</span>
                    <span className="text-sm font-medium text-brand-700">
                      {esp.equipe.length} {esp.equipe.length === 1 ? "profissional" : "profissionais"}
                    </span>
                  </span>
                  <span className="mt-1 block text-slate-600">{esp.texto}</span>
                  <span className="mt-2 inline-block text-sm font-semibold text-slate-900 underline decoration-brand-500 decoration-2 underline-offset-4 group-hover:text-brand-700">
                    Ver equipe
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
