import { formatarDias, iniciais, type Modelo } from "@/lib/site";
import type { PedidoAgendamento } from "./ClinicaDemo";

type Props = {
  modelo: Modelo;
  filtro: string; // "todas" ou o id de uma especialidade
  onFiltrar: (filtro: string) => void;
  onAgendar: (pedido: PedidoAgendamento) => void;
};

export default function Equipe({ modelo, filtro, onFiltrar, onAgendar }: Props) {
  const lista = modelo.especialidades
    .filter((esp) => filtro === "todas" || esp.id === filtro)
    .flatMap((esp) => esp.equipe.map((prof) => ({ esp, prof })));

  const opcoes = [{ id: "todas", titulo: "Todas" }, ...modelo.especialidades];

  return (
    <section id="equipe" className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">Nossa equipe</h2>
          <p className="mt-3 text-lg text-slate-600">
            Veja os dias de atendimento de cada profissional e agende direto com quem você prefere.
          </p>
        </div>

        <div role="group" aria-label="Filtrar por especialidade" className="mt-8 flex flex-wrap gap-2">
          {opcoes.map((op) => {
            const ativo = op.id === filtro;
            return (
              <button
                key={op.id}
                type="button"
                aria-pressed={ativo}
                onClick={() => onFiltrar(op.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 ${
                  ativo ? "bg-brand-700 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-brand-600"
                }`}
              >
                {op.titulo}
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">{lista.length} profissionais exibidos</p>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map(({ esp, prof }) => (
            <li key={prof.nome} className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-100 text-lg font-semibold text-brand-800">
                  {iniciais(prof.nome)}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-900">{prof.nome}</h3>
                  <p className="text-sm text-brand-700">{esp.titulo}</p>
                </div>
              </div>
              <p className="mt-4 flex-1 text-slate-600">{prof.resumo}</p>
              <dl className="mt-4 space-y-1 text-sm">
                <div className="flex gap-2">
                  <dt className="text-slate-500">Atende:</dt>
                  <dd className="font-medium text-slate-800">{formatarDias(prof.dias)}</dd>
                </div>
                {prof.registro && (
                  <div className="flex gap-2">
                    <dt className="text-slate-500">Registro:</dt>
                    <dd className="text-slate-800">{prof.registro}</dd>
                  </div>
                )}
              </dl>
              <button
                type="button"
                onClick={() => onAgendar({ especialidadeId: esp.id, profissional: prof.nome })}
                className="mt-5 rounded-full border border-brand-700 px-4 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-700 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
              >
                Agendar com {prof.nome.split(" ").slice(0, 2).join(" ")}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
