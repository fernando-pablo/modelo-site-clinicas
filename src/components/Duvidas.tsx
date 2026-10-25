import { perguntasComuns, type Modelo } from "@/lib/site";

export default function Duvidas({ modelo }: { modelo: Modelo }) {
  const convenios = modelo.convenios.length
    ? {
        pergunta: "Quais convênios vocês aceitam?",
        resposta: `Atendemos particular e os convênios ${modelo.convenios.join(", ")}. Escolha o seu no agendamento e informe o número da carteirinha.`,
      }
    : {
        pergunta: "Vocês aceitam convênios?",
        resposta: "No momento o atendimento é somente particular. Consulte as formas de pagamento com a recepção.",
      };
  const perguntas = [perguntasComuns[0], convenios, ...perguntasComuns.slice(1), modelo.perguntaExtra];
  return (
    <section id="duvidas" className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">Dúvidas frequentes</h2>
          <p className="mt-3 text-slate-600">Não encontrou o que procurava? Chame a recepção no WhatsApp.</p>
        </div>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {perguntas.map((p) => (
            <details key={p.pergunta} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700">
                {p.pergunta}
                <span aria-hidden="true" className="text-2xl font-light text-brand-700 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-slate-600">{p.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
