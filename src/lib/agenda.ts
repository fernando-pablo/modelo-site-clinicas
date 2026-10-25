import { clinica } from "./site";

// Funções de data usadas no hero e no agendamento. Tudo calculado no navegador.

export function toISO(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${dia}`;
}

export function fromISO(iso: string) {
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(a, m - 1, d);
}

const CURTO = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function dataCurta(d: Date) {
  return `${CURTO[d.getDay()]} ${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function dataCompleta(iso: string) {
  const d = fromISO(iso);
  const nomes = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()} (${nomes[d.getDay()]})`;
}

// Próximas datas em que o profissional atende, a partir de amanhã.
export function proximosDias(dias: number[], quantidade: number, hoje = new Date()) {
  const resultado: Date[] = [];
  const d = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  for (let i = 0; i < 21 && resultado.length < quantidade; i++) {
    d.setDate(d.getDate() + 1);
    if (dias.includes(d.getDay())) resultado.push(new Date(d));
  }
  return resultado;
}

// Lê os horários do site.ts no formato do Google ("Mo-Fr 07:00-18:00").
const SIGLAS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const emMinutos = (h: string) => Number(h.slice(0, 2)) * 60 + Number(h.slice(3, 5));

function horarioDoDia(diaSemana: number) {
  for (const h of clinica.hours) {
    const [dias, horas] = h.schema.split(" ");
    const [ini, fim] = dias.split("-").map((s) => SIGLAS.indexOf(s));
    const dentro = fim === undefined ? diaSemana === ini : diaSemana >= ini && diaSemana <= fim;
    if (dentro) {
      const [abre, fecha] = horas.split("-");
      return { abre, fecha };
    }
  }
  return null;
}

export function statusAtendimento(agora = new Date()) {
  const hoje = horarioDoDia(agora.getDay());
  const minutos = agora.getHours() * 60 + agora.getMinutes();
  const emMin = emMinutos;
  const fmt = (h: string) => `${h.slice(0, 2)}h${h.slice(3, 5) === "00" ? "" : h.slice(3, 5)}`;

  if (hoje && minutos >= emMin(hoje.abre) && minutos < emMin(hoje.fecha)) {
    return { aberto: true, texto: `Aberto agora, até ${fmt(hoje.fecha)}` };
  }
  if (hoje && minutos < emMin(hoje.abre)) {
    return { aberto: false, texto: `Fechado agora, abre hoje às ${fmt(hoje.abre)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const dia = (agora.getDay() + i) % 7;
    const h = horarioDoDia(dia);
    if (h) {
      const quando = i === 1 ? "amanhã" : ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"][dia];
      return { aberto: false, texto: `Fechado agora, abre ${quando} às ${fmt(h.abre)}` };
    }
  }
  return { aberto: false, texto: "Fechado" };
}

const paraHora = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

// Horários de consulta do dia, de acordo com o funcionamento, a pausa do almoço e a duração da consulta.
export function horariosDoDia(diaSemana: number, duracao: number) {
  const h = horarioDoDia(diaSemana);
  if (!h) return [];
  const pausaIni = emMinutos(clinica.intervalo.inicio);
  const pausaFim = emMinutos(clinica.intervalo.fim);
  const horarios: string[] = [];
  let t = emMinutos(h.abre);
  const fecha = emMinutos(h.fecha);
  while (t + duracao <= fecha) {
    if (t < pausaFim && t + duracao > pausaIni) {
      t = pausaFim; // pula para depois do almoço
      continue;
    }
    horarios.push(paraHora(t));
    t += duracao;
  }
  return horarios;
}

// Só na demonstração: marca alguns horários como ocupados para a agenda parecer real.
// O resultado é sempre o mesmo para a mesma data, profissional e horário.
export function ocupadoNaDemonstracao(chave: string) {
  let hash = 2166136261;
  for (let i = 0; i < chave.length; i++) hash = Math.imul(hash ^ chave.charCodeAt(i), 16777619);
  hash = Math.imul(hash ^ (hash >>> 15), 2246822507);
  return ((hash ^ (hash >>> 13)) >>> 0) % 10 < 3;
}

// ---------- Lembrete na agenda do paciente ----------
type Evento = { titulo: string; descricao: string; local: string; data: string; horario: string; duracao: number };

function carimbo(data: string, minutos: number) {
  const h = String(Math.floor(minutos / 60)).padStart(2, "0");
  const m = String(minutos % 60).padStart(2, "0");
  return `${data.replace(/-/g, "")}T${h}${m}00`;
}

function inicioFim(ev: Evento) {
  const ini = emMinutos(ev.horario);
  return [carimbo(ev.data, ini), carimbo(ev.data, ini + ev.duracao)];
}

export function linkGoogleAgenda(ev: Evento) {
  const [ini, fim] = inicioFim(ev);
  const p = new URLSearchParams({
    action: "TEMPLATE", text: ev.titulo, details: ev.descricao, location: ev.local,
    dates: `${ini}/${fim}`, ctz: "America/Sao_Paulo",
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

// Arquivo .ics: abre na agenda do celular (iPhone, Android, Outlook).
export function baixarICS(ev: Evento) {
  const [ini, fim] = inicioFim(ev);
  const esc = (t: string) => t.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Modelo Clinica//PT-BR", "BEGIN:VEVENT",
    `UID:${ini}-${Math.random().toString(36).slice(2)}@clinica`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    `DTSTART:${ini}`, `DTEND:${fim}`,
    `SUMMARY:${esc(ev.titulo)}`, `DESCRIPTION:${esc(ev.descricao)}`, `LOCATION:${esc(ev.local)}`,
    "BEGIN:VALARM", "TRIGGER:-PT2H", "ACTION:DISPLAY", "DESCRIPTION:Lembrete da consulta", "END:VALARM",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "consulta.ics";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
