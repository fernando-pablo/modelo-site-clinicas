import { useEffect, useState } from "react";
import { iniciais, type Modelo } from "@/lib/site";
import { dataCurta, proximosDias, statusAtendimento, toISO } from "@/lib/agenda";
import type { PedidoAgendamento } from "./ClinicaDemo";

type Props = { modelo: Modelo; onAgendar: (pedido: PedidoAgendamento) => void };

export default function Hero({ modelo, onAgendar }: Props) {
  // Datas e "aberto agora" dependem do relógio do visitante, então só são calculadas no navegador.
  const [hoje, setHoje] = useState<Date | null>(null);
  useEffect(() => setHoje(new Date()), []);

  // Um profissional de cada uma das três primeiras especialidades, com os próximos dias livres.
  const destaques = modelo.especialidades.slice(0, 3).map((esp) => ({ esp, prof: esp.equipe[0] }));
  const status = hoje ? statusAtendimento(hoje) : null;
  const totalProfissionais = modelo.especialidades.reduce((soma, e) => soma + e.equipe.length, 0);

  return (
    <section id="inicio" className="relative overflow-hidden bg-brand-50">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 md:py-20 lg:grid-cols-[1.1fr_1fr]">
        <div>
          {status && (
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-sm">
              <span aria-hidden="true" className={`h-2 w-2 rounded-full ${status.aberto ? "bg-brand-500" : "bg-slate-400"}`} />
              {status.texto}
            </p>
          )}
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-slate-900 md:text-5xl">
            {modelo.tituloHero}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">{modelo.textoHero}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#agendar" className="rounded-full bg-brand-700 px-6 py-3 font-semibold text-white hover:bg-brand-800">
              Agendar consulta
            </a>
            <a href="#especialidades" className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:border-brand-600 hover:text-brand-700">
              Ver especialidades
            </a>
          </div>
          <p className="mt-8 text-sm text-slate-500">
            {modelo.especialidades.length} especialidades e {totalProfissionais} profissionais em um só endereço.
          </p>
        </div>

        {/* Agenda da semana: o elemento de destaque da página. Cada horário já abre o agendamento preenchido. */}
        <div className="rounded-3xl bg-white p-5 shadow-xl shadow-brand-800/10 ring-1 ring-slate-200 md:p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg font-semibold text-slate-900">Próximos horários</h2>
            <span className="text-xs text-slate-500">toque para agendar</span>
          </div>
          <ul className="mt-4 divide-y divide-slate-100">
            {destaques.map(({ esp, prof }) => (
              <li key={prof.nome} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-800">
                    {iniciais(prof.nome)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">{prof.nome}</p>
                    <p className="text-sm text-slate-500">{esp.titulo}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {hoje
                    ? proximosDias(prof.dias, 3, hoje).map((d) => (
                        <button
                          key={d.toISOString()}
                          type="button"
                          onClick={() => onAgendar({ especialidadeId: esp.id, profissional: prof.nome, data: toISO(d) })}
                          aria-label={`Agendar com ${prof.nome} em ${dataCurta(d)}`}
                          className="rounded-lg border border-brand-100 bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-800 hover:border-brand-600 hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                        >
                          {dataCurta(d)}
                        </button>
                      ))
                    : <span className="h-8" />}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
