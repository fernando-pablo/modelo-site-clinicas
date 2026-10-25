import type { Modelo } from "@/lib/site";
import MobileMenu from "./MobileMenu";

const links = [
  { href: "#especialidades", label: "Especialidades" },
  { href: "#equipe", label: "Equipe" },
  { href: "#agendar", label: "Agendamento" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
];

export default function Header({ modelo }: { modelo: Modelo }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#inicio" className="flex min-w-0 items-center gap-2.5 font-display text-base font-semibold text-slate-900 sm:text-lg">
          <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold text-white">
            {modelo.nome.charAt(0)}
          </span>
          <span className="truncate">{modelo.nome}</span>
        </a>
        <nav aria-label="Principal" className="hidden gap-6 text-sm font-medium text-slate-600 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-brand-700">{l.label}</a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <a href="#agendar" className="rounded-full bg-brand-700 px-3.5 py-2 text-sm sm:px-4 font-semibold text-white hover:bg-brand-800">
            Agendar
          </a>
          <MobileMenu links={links} />
        </div>
      </div>
    </header>
  );
}
