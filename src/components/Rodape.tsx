import { demo, whatsappLink, type Modelo } from "@/lib/site";

export default function Rodape({ modelo }: { modelo: Modelo }) {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 py-10 text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {modelo.nome}. {modelo.tagline}.</p>
        {demo.ativa && (
          <p>
            Clínica, equipe, registros e depoimentos fictícios. Site modelo por{" "}
            <a
              href={demo.portfolio || whatsappLink(demo.mensagemInteresse)}
              target="_blank" rel="noopener noreferrer"
              className="font-semibold text-white underline underline-offset-4 hover:text-brand-100"
            >
              {demo.agencia}
            </a>
            .
          </p>
        )}
      </div>
    </footer>
  );
}
