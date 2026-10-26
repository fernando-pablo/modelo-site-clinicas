import { abrirWhatsAppClinica } from "@/lib/whatsapp";
import { demo, clinica, mensagemClinica, whatsappLink, type Modelo } from "@/lib/site";
import { IconeWhatsApp } from "./Icone";

export default function Contato({ modelo }: { modelo: Modelo }) {
  const { street, city, region, zip } = clinica.address;
  const q = encodeURIComponent(`${street}, ${city} - ${region}`);
  return (
    <section id="contato" className="py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">Como chegar</h2>
          <address className="mt-8 space-y-6 not-italic text-slate-700">
            <div>
              <p className="font-semibold text-slate-900">Endereço</p>
              <p>{street}, {city} - {region}, {zip}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Horários</p>
              <ul>{clinica.hours.map((h) => <li key={h.days}>{h.days}: {h.time}</li>)}</ul>
            </div>
            <div>
              <p className="font-semibold text-slate-900">E-mail</p>
              <p>{clinica.email}</p>
            </div>
          </address>
          <a
            href={whatsappLink(mensagemClinica(`Olá! Tenho uma dúvida sobre a ${modelo.nome}.`))}
      onClick={(e) => { if (demo.ativa) { e.preventDefault(); abrirWhatsAppClinica(mensagemClinica(`Olá! Tenho uma dúvida sobre a ${modelo.nome}.`)); } }}
            target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 font-semibold text-white hover:bg-brand-800"
          >
            <IconeWhatsApp /> Falar com a recepção
          </a>
        </div>
        <iframe
          title={`Mapa: ${modelo.nome}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-80 w-full rounded-3xl border-0 bg-slate-100 lg:h-full lg:min-h-96"
          src={`https://www.google.com/maps?q=${q}&output=embed`}
        />
      </div>
    </section>
  );
}
