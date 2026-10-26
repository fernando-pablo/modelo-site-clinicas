"use client";
import { useCallback, useEffect, useState } from "react";
import { getModelo, modeloPadrao } from "@/lib/site";
import DemoBar from "./DemoBar";
import Header from "./Header";
import Hero from "./Hero";
import Especialidades from "./Especialidades";
import Equipe from "./Equipe";
import Agendamento from "./Agendamento";
import Depoimentos from "./Depoimentos";
import Duvidas from "./Duvidas";
import Contato from "./Contato";
import Rodape from "./Rodape";
import BotaoWhatsApp from "./BotaoWhatsApp";
import SimulacaoWhatsApp from "./SimulacaoWhatsApp";

export type PedidoAgendamento = { especialidadeId?: string; profissional?: string; data?: string };

function rolarPara(id: string) {
  const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduzir ? "auto" : "smooth", block: "start" });
}

export default function ClinicaDemo() {
  const [modeloId, setModeloId] = useState(modeloPadrao.id);
  const [filtro, setFiltro] = useState("todas");
  const [pedido, setPedido] = useState<PedidoAgendamento & { chave: number }>({ chave: 0 });
  const modelo = getModelo(modeloId);

  // O modelo escolhido fica no endereço (?modelo=odontologia), para dar para mandar o link de cada versão.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("modelo");
    if (id) setModeloId(getModelo(id).id);
  }, []);

  useEffect(() => {
    document.title = `${modelo.nome} | ${modelo.tagline}`;
  }, [modelo]);

  const trocarModelo = useCallback((id: string) => {
    setModeloId(id);
    setFiltro("todas");
    setPedido({ chave: 0 });
    const url = new URL(window.location.href);
    url.searchParams.set("modelo", id);
    window.history.replaceState(null, "", url);
  }, []);

  const verEquipe = useCallback((especialidadeId: string) => {
    setFiltro(especialidadeId);
    rolarPara("equipe");
  }, []);

  const agendar = useCallback((p: PedidoAgendamento) => {
    setPedido((atual) => ({ ...p, chave: atual.chave + 1 }));
    rolarPara("agendar");
  }, []);

  // As cores de cada modelo entram como variáveis CSS; todas as classes "brand" do Tailwind as usam.
  const cores = Object.fromEntries(
    Object.entries(modelo.cores).map(([tom, hex]) => [`--color-brand-${tom}`, hex]),
  ) as React.CSSProperties;

  return (
    <div style={cores}>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-brand-700 focus:shadow"
      >
        Pular para o conteúdo
      </a>
      <DemoBar modeloId={modelo.id} onTrocar={trocarModelo} />
      <Header modelo={modelo} />
      <main id="conteudo">
        <Hero modelo={modelo} onAgendar={agendar} />
        <Especialidades modelo={modelo} onVerEquipe={verEquipe} />
        <Equipe modelo={modelo} filtro={filtro} onFiltrar={setFiltro} onAgendar={agendar} />
        <Agendamento modelo={modelo} pedido={pedido} />
        <Depoimentos modelo={modelo} />
        <Duvidas modelo={modelo} />
        <Contato modelo={modelo} />
      </main>
      <Rodape modelo={modelo} />
      <BotaoWhatsApp modelo={modelo} />
      <SimulacaoWhatsApp modelo={modelo} />
    </div>
  );
}
