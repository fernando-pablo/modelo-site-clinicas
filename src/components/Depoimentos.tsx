import type { Modelo } from "@/lib/site";

export default function Depoimentos({ modelo }: { modelo: Modelo }) {
  return (
    <section id="depoimentos" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">Quem já passou por aqui</h2>
        <ul className="mt-10 grid gap-10 md:grid-cols-3">
          {modelo.depoimentos.map((d) => (
            <li key={d.nome} className="border-l-4 border-brand-500 pl-5">
              <blockquote className="font-display text-lg leading-relaxed text-slate-800">“{d.texto}”</blockquote>
              <p className="mt-3 text-sm font-medium text-slate-500">{d.nome}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
