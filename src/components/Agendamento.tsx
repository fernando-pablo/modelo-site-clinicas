import { useEffect, useRef, useState } from "react";
import { clinica, demo, formatarDias, mensagemClinica, whatsappLink, type Modelo } from "@/lib/site";
import {
  baixarICS, dataCompleta, dataCurta, fromISO, horariosDoDia, linkGoogleAgenda, ocupadoNaDemonstracao, proximosDias, toISO,
} from "@/lib/agenda";
import type { PedidoAgendamento } from "./ClinicaDemo";

type Props = { modelo: Modelo; pedido: PedidoAgendamento & { chave: number } };

const campo =
  "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function Agendamento({ modelo, pedido }: Props) {
  const [especialidadeId, setEspecialidadeId] = useState(modelo.especialidades[0].id);
  const [profissional, setProfissional] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [pagamento, setPagamento] = useState<"" | "particular" | "convenio">("");
  const [convenio, setConvenio] = useState("");
  const [carteirinha, setCarteirinha] = useState("");
  const [linkEnviado, setLinkEnviado] = useState("");
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [amanha, setAmanha] = useState<Date | null>(null);
  const dataRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    setAmanha(d);
  }, []);

  // Quando o visitante clica em "Agendar com..." em outra parte da página, o formulário vem preenchido.
  useEffect(() => {
    setEspecialidadeId(pedido.especialidadeId ?? modelo.especialidades[0].id);
    setProfissional(pedido.profissional ?? "");
    setData(pedido.data ?? "");
    setHorario("");
    setErro("");
    setEnviado(false);
    if (!modelo.convenios.includes(convenio)) setConvenio("");
    if (!modelo.convenios.length && pagamento === "convenio") setPagamento("");
    if (pedido.chave > 0) {
      // Foca no próximo campo que falta preencher.
      setTimeout(() => (pedido.data ? document.getElementById("ag-nome") : dataRef.current)?.focus({ preventScroll: true }), 400);
    }
  }, [pedido, modelo]);

  const especialidade = modelo.especialidades.find((e) => e.id === especialidadeId) ?? modelo.especialidades[0];
  const prof = especialidade.equipe.find((p) => p.nome === profissional);
  const diaSemana = data ? fromISO(data).getDay() : null;
  const horarios = diaSemana === null ? [] : horariosDoDia(diaSemana, especialidade.duracao);
  // Na demonstração, alguns horários aparecem ocupados para a agenda parecer real.
  const estaOcupado = (h: string) => demo.ativa && ocupadoNaDemonstracao(`${data}|${profissional || especialidade.id}|${h}`);
  const livres = horarios.filter((h) => !estaOcupado(h));

  // Avisos de disponibilidade, mostrados enquanto o visitante preenche.
  let aviso = "";
  if (diaSemana !== null && horarios.length === 0) {
    aviso = "A clínica não abre nesse dia. Escolha outra data.";
  } else if (prof && diaSemana !== null && !prof.dias.includes(diaSemana)) {
    aviso = `${prof.nome} atende ${formatarDias(prof.dias)}. Escolha uma das datas sugeridas ou outro profissional.`;
  }

  function enviar(event: React.FormEvent) {
    event.preventDefault();
    if (!nome.trim()) return setErro("Informe seu nome.");
    if (!data) return setErro("Escolha a data.");
    if (aviso) return setErro(aviso);
    if (!horario || !livres.includes(horario)) return setErro("Escolha um horário.");
    if (pagamento === "convenio" && !convenio) return setErro("Escolha o seu convênio ou marque outra opção de atendimento.");

    const atendimento =
      pagamento === "particular" ? "• Atendimento: Particular"
        : pagamento === "convenio" ? `• Convênio: ${convenio}${carteirinha.trim() ? ` (carteirinha ${carteirinha.trim()})` : ""}`
        : "";

    const linhas = [
      "Olá! Gostaria de agendar:",
      `• Especialidade: ${especialidade.titulo}`,
      `• Profissional: ${profissional || "Sem preferência"}`,
      `• Data: ${dataCompleta(data)}`,
      `• Horário: ${horario}`,
      `• Nome: ${nome.trim()}`,
      telefone.trim() && `• Telefone: ${telefone.trim()}`,
      atendimento,
    ].filter(Boolean);

    const link = whatsappLink(mensagemClinica(linhas.join("\n")));
    window.open(link, "_blank", "noopener,noreferrer");
    setLinkEnviado(link);
    setErro("");
    setEnviado(true);
  }

  const evento = {
    titulo: `Consulta: ${especialidade.titulo} (${modelo.nome})`,
    descricao: `${profissional || "Profissional a definir"}. Pedido enviado pelo site; aguarde a confirmação da recepção pelo WhatsApp.`,
    local: `${clinica.address.street}, ${clinica.address.city} - ${clinica.address.region}`,
    data,
    horario,
    duracao: especialidade.duracao,
  };

  const sugestoes = prof && amanha ? proximosDias(prof.dias, 4, new Date(amanha.getTime() - 86400000)) : [];

  return (
    <section id="agendar" className="bg-brand-800 py-16 text-white md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Agende em menos de um minuto</h2>
          <p className="mt-4 text-lg text-white/80">
            Sem ligação e sem espera. Você escolhe o horário, e a recepção confirma pelo WhatsApp.
          </p>
          <ol className="mt-10 space-y-6">
            {[
              ["Escolha a especialidade", "Se quiser, escolha também o profissional."],
              ["Escolha o dia e o horário", "Os horários seguem a duração de cada consulta."],
              ["Envie pelo WhatsApp", "A mensagem já vai pronta para a recepção."],
            ].map(([titulo, texto], i) => (
              <li key={titulo} className="flex gap-4">
                <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 font-display font-semibold">
                  {i + 1}
                </span>
                <p className="pt-1.5 text-white/80">
                  <strong className="font-semibold text-white">{titulo}.</strong> {texto}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <form onSubmit={enviar} noValidate className="rounded-3xl bg-white p-6 text-slate-800 shadow-2xl md:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Especialidade
              <select className={campo} value={especialidadeId}
                onChange={(e) => { setEspecialidadeId(e.target.value); setProfissional(""); setHorario(""); setEnviado(false); }}>
                {modelo.especialidades.map((esp) => <option key={esp.id} value={esp.id}>{esp.titulo}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium">
              Profissional
              <select className={campo} value={profissional}
                onChange={(e) => { setProfissional(e.target.value); setHorario(""); setEnviado(false); }}>
                <option value="">Sem preferência</option>
                {especialidade.equipe.map((p) => <option key={p.nome} value={p.nome}>{p.nome}</option>)}
              </select>
            </label>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium" htmlFor="ag-data">Data</label>
              <input id="ag-data" ref={dataRef} type="date" className={campo} value={data}
                min={amanha ? toISO(amanha) : undefined}
                onChange={(e) => { setData(e.target.value); setHorario(""); setEnviado(false); }} />
              {sugestoes.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-slate-500">Próximas datas:</span>
                  {sugestoes.map((d) => (
                    <button key={d.toISOString()} type="button"
                      onClick={() => { setData(toISO(d)); setHorario(""); setEnviado(false); }}
                      className={`rounded-lg px-2.5 py-1 font-medium ${data === toISO(d) ? "bg-brand-700 text-white" : "bg-brand-50 text-brand-800 hover:bg-brand-100"}`}>
                      {dataCurta(d)}
                    </button>
                  ))}
                </div>
              )}
              {aviso && <p role="status" className="mt-2 text-sm font-medium text-amber-700">{aviso}</p>}
            </div>

            <fieldset className="sm:col-span-2">
              <legend className="flex w-full flex-wrap items-baseline justify-between gap-2 text-sm font-medium">
                Horário
                <span className="font-normal text-slate-500">Consultas de {especialidade.duracao} minutos</span>
              </legend>
              {!data || aviso ? (
                <p className="mt-1 rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-500">
                  {aviso ? "Escolha uma data válida para ver os horários." : "Escolha a data para ver os horários livres."}
                </p>
              ) : (
                <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {horarios.map((h) => {
                    const ocupado = estaOcupado(h);
                    const escolhido = horario === h;
                    return (
                      <label key={h} className={`rounded-lg border py-2 text-center text-sm font-medium ${
                        ocupado ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300 line-through"
                          : escolhido ? "cursor-pointer border-brand-700 bg-brand-700 text-white"
                          : "cursor-pointer border-slate-300 hover:border-brand-600"}`}>
                        <input type="radio" name="horario" value={h} className="sr-only" disabled={ocupado}
                          checked={escolhido} onChange={() => { setHorario(h); setEnviado(false); }} />
                        {h}
                        {ocupado && <span className="sr-only"> (ocupado)</span>}
                      </label>
                    );
                  })}
                </div>
              )}
            </fieldset>

            <label className="block text-sm font-medium">
              Seu nome
              <input id="ag-nome" className={campo} value={nome} autoComplete="name"
                onChange={(e) => { setNome(e.target.value); setEnviado(false); }} />
            </label>
            <label className="block text-sm font-medium">
              Telefone <span className="font-normal text-slate-500">(opcional)</span>
              <input className={campo} value={telefone} type="tel" autoComplete="tel" inputMode="tel"
                onChange={(e) => setTelefone(e.target.value)} />
            </label>

            <fieldset className="sm:col-span-2">
              <legend className="text-sm font-medium">
                Atendimento <span className="font-normal text-slate-500">(opcional)</span>
              </legend>
              {modelo.convenios.length === 0 ? (
                <p className="mt-1 text-sm text-slate-600">Atendimento somente particular.</p>
              ) : (
                <>
                  <div className="mt-1 grid grid-cols-3 gap-2">
                    {([["particular", "Particular"], ["convenio", "Convênio"], ["", "Informar depois"]] as const).map(([valor, rotulo]) => (
                      <label key={rotulo} className={`cursor-pointer rounded-xl border px-2 py-2.5 text-center text-sm font-medium ${
                        pagamento === valor ? "border-brand-700 bg-brand-700 text-white" : "border-slate-300 hover:border-brand-600"}`}>
                        <input type="radio" name="pagamento" value={valor} className="sr-only" checked={pagamento === valor}
                          onChange={() => { setPagamento(valor); setEnviado(false); }} />
                        {rotulo}
                      </label>
                    ))}
                  </div>
                  {pagamento === "convenio" && (
                    <div className="mt-3 grid gap-4 rounded-2xl bg-brand-50 p-4 sm:grid-cols-2">
                      <label className="block text-sm font-medium">
                        Convênio
                        <select className={campo} value={convenio}
                          onChange={(e) => { setConvenio(e.target.value); setEnviado(false); }}>
                          <option value="">Escolha</option>
                          {modelo.convenios.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </label>
                      <label className="block text-sm font-medium">
                        Nº da carteirinha <span className="font-normal text-slate-500">(opcional)</span>
                        <input className={campo} value={carteirinha} inputMode="numeric"
                          onChange={(e) => setCarteirinha(e.target.value)} />
                      </label>
                      <p className="text-xs text-slate-600 sm:col-span-2">
                        Não encontrou o seu? A clínica atende apenas os convênios da lista. Escolha particular ou fale com a recepção.
                      </p>
                    </div>
                  )}
                </>
              )}
            </fieldset>
          </div>

          {erro && <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{erro}</p>}
          <button type="submit" className="mt-6 w-full rounded-full bg-brand-700 px-6 py-3.5 font-semibold text-white hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">
            Enviar pedido pelo WhatsApp
          </button>
          <p className="mt-3 text-center text-xs text-slate-500">
            Abre o seu WhatsApp com a mensagem pronta para a recepção, que responde confirmando o horário.
          </p>

          {enviado && !erro && (
            <div role="status" className="mt-6 rounded-2xl bg-brand-50 p-5">
              <p className="font-display text-lg font-semibold text-brand-800">Pedido pronto para envio</p>
              <p className="mt-1 text-sm text-slate-700">
                {especialidade.titulo}{profissional ? ` com ${profissional}` : ""}, {dataCompleta(data)} às {horario}.
                Toque em enviar no WhatsApp; a recepção responde confirmando a consulta.
              </p>
              <p className="mt-4 text-sm font-medium text-slate-800">Guarde um lembrete na sua agenda:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <a href={linkGoogleAgenda(evento)} target="_blank" rel="noopener noreferrer"
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-800 ring-1 ring-brand-100 hover:ring-brand-600">
                  Google Agenda
                </a>
                <button type="button" onClick={() => baixarICS(evento)}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-800 ring-1 ring-brand-100 hover:ring-brand-600">
                  Agenda do celular
                </button>
                <a href={linkEnviado} target="_blank" rel="noopener noreferrer"
                  className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 underline underline-offset-4 hover:text-brand-800">
                  O WhatsApp não abriu? Toque aqui
                </a>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
