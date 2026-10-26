// ============================================================
// Todo o conteúdo do site fica aqui. Para um cliente real, edite só este arquivo.
// ============================================================

// ---------- Demonstração (Lychnos Tech) ----------
// Enquanto `ativa` for true, aparece a faixa de demonstração no topo, os pedidos de agendamento
// aparecem numa simulação de conversa (nada é enviado) e só o botão "Quero um site assim"
// abre o seu WhatsApp. Para um cliente real: ativa: false e troque `whatsapp` pelo número da clínica.
export const demo = {
  ativa: true,
  agencia: "Lychnos Tech",
  whatsapp: "5538984081191", // só números: 55 + DDD + número
  mensagemInteresse:
    "Olá, Fernando! Vi o modelo de site para clínicas da Lychnos Tech e quero um site assim para o meu negócio.",
  // Link do seu portfólio (aparece no rodapé). Deixe "" para esconder.
  portfolio: "https://lychnostech.vercel.app",
};

// ---------- Dados que valem para todos os modelos ----------
export const clinica = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://modelo-site-clinicas.vercel.app",
  whatsapp: demo.whatsapp,
  email: "contato@clinicaexemplo.com.br",
  address: { street: "Av. Principal, 100 - Centro", city: "Jaíba", region: "MG", zip: "39508-000" },
  // `days` e `time` aparecem no site. `schema` vai para os dados estruturados do Google.
  hours: [
    { days: "Segunda a sexta", time: "07h às 18h", schema: "Mo-Fr 07:00-18:00" },
    { days: "Sábado", time: "07h às 12h", schema: "Sa 07:00-12:00" },
  ],
  // Pausa do almoço: nenhum horário de consulta é oferecido dentro dela.
  intervalo: { inicio: "12:00", fim: "13:00" },
};

// ---------- Tipos ----------
export type IconName =
  | "estetoscopio" | "crianca" | "coracao" | "mulher" | "maca" | "dente" | "alinhador"
  | "implante" | "brilho" | "mente" | "casal" | "cerebro" | "pele" | "rosto"
  | "corpo" | "laser";

export type Profissional = {
  nome: string;
  registro?: string; // fictício na demonstração
  resumo: string;
  dias: number[]; // 1 = segunda ... 6 = sábado
};

export type Especialidade = {
  id: string;
  titulo: string;
  texto: string;
  icone: IconName;
  duracao: number; // minutos de cada consulta, usado para montar os horários
  equipe: Profissional[];
};

export type Modelo = {
  id: string;
  rotulo: string; // texto do botão de troca
  nome: string;
  tagline: string;
  descricao: string;
  tituloHero: string;
  textoHero: string;
  tipoSchema: string; // tipo de negócio para o Google
  cores: Record<"50" | "100" | "500" | "600" | "700" | "800", string>;
  especialidades: Especialidade[];
  depoimentos: { nome: string; texto: string }[];
  convenios: string[]; // convênios aceitos; lista vazia = só particular
  perguntaExtra: { pergunta: string; resposta: string };
};

// ---------- Os 4 modelos ----------
export const modelos: Modelo[] = [
  {
    id: "medica",
    rotulo: "Clínica médica",
    nome: "Clínica Vida Plena",
    tagline: "Cuidado próximo, atendimento sem fila",
    descricao:
      "Clínica médica com clínico geral, pediatria, cardiologia, ginecologia e nutrição. Agende pelo WhatsApp e seja atendido com hora marcada.",
    tituloHero: "Saúde para toda a família, com hora marcada",
    textoHero:
      "Especialistas em um só lugar, atendimento humanizado e agendamento em poucos toques, direto pelo WhatsApp.",
    tipoSchema: "MedicalClinic",
    cores: { "50": "#ecfdf5", "100": "#d1fae5", "500": "#10b981", "600": "#059669", "700": "#047857", "800": "#065f46" },
    especialidades: [
      {
        id: "clinico-geral", titulo: "Clínico geral", icone: "estetoscopio", duracao: 30,
        texto: "Consultas de rotina, check-up e acompanhamento contínuo.",
        equipe: [
          { nome: "Dra. Ana Souza", registro: "CRM 00000-MG", resumo: "Check-up e acompanhamento de doenças crônicas.", dias: [1, 3, 5] },
          { nome: "Dr. Paulo Mendes", registro: "CRM 00000-MG", resumo: "Atendimento de adultos e idosos.", dias: [2, 4, 6] },
          { nome: "Dra. Luíza Ferreira", registro: "CRM 00000-MG", resumo: "Saúde preventiva e medicina da família.", dias: [1, 2, 3, 4, 5] },
        ],
      },
      {
        id: "pediatria", titulo: "Pediatria", icone: "crianca", duracao: 30,
        texto: "Cuidado desde o recém-nascido até a adolescência.",
        equipe: [
          { nome: "Dra. Marina Alves", registro: "CRM 00000-MG", resumo: "Puericultura e acompanhamento do crescimento.", dias: [1, 2, 4] },
          { nome: "Dr. Rafael Costa", registro: "CRM 00000-MG", resumo: "Alergias e doenças respiratórias infantis.", dias: [3, 5, 6] },
          { nome: "Dra. Beatriz Nogueira", registro: "CRM 00000-MG", resumo: "Atendimento de adolescentes.", dias: [2, 4] },
        ],
      },
      {
        id: "cardiologia", titulo: "Cardiologia", icone: "coracao", duracao: 40,
        texto: "Prevenção, diagnóstico e tratamento do coração.",
        equipe: [
          { nome: "Dr. Carlos Lima", registro: "CRM 00000-MG", resumo: "Hipertensão e avaliação cardiológica.", dias: [1, 3] },
          { nome: "Dra. Helena Duarte", registro: "CRM 00000-MG", resumo: "Cardiologia preventiva e do esporte.", dias: [2, 5] },
        ],
      },
      {
        id: "ginecologia", titulo: "Ginecologia", icone: "mulher", duracao: 40,
        texto: "Saúde da mulher em todas as fases.",
        equipe: [
          { nome: "Dra. Camila Rocha", registro: "CRM 00000-MG", resumo: "Ginecologia preventiva e pré-natal.", dias: [1, 4] },
          { nome: "Dra. Juliana Prado", registro: "CRM 00000-MG", resumo: "Climatério e saúde hormonal.", dias: [2, 3, 6] },
        ],
      },
      {
        id: "nutricao", titulo: "Nutrição", icone: "maca", duracao: 60,
        texto: "Plano alimentar personalizado e acompanhado.",
        equipe: [
          { nome: "Gabriela Martins", registro: "CRN 9/00000", resumo: "Reeducação alimentar e emagrecimento.", dias: [1, 3, 5] },
          { nome: "Thiago Reis", registro: "CRN 9/00000", resumo: "Nutrição esportiva.", dias: [2, 4, 6] },
        ],
      },
    ],
    depoimentos: [
      { nome: "Maria J.", texto: "Atendimento atencioso e sem demora. Recomendo a toda a família." },
      { nome: "Roberto S.", texto: "Fiz os exames e a consulta no mesmo dia. Muito prático." },
      { nome: "Fernanda C.", texto: "A pediatra é ótima com as crianças. Meu filho adora ir." },
    ],
    convenios: ["Unimed", "Bradesco Saúde", "SulAmérica", "Amil", "Cassi", "Hapvida"],
    perguntaExtra: {
      pergunta: "Vocês fazem exames na própria clínica?",
      resposta: "Sim. A coleta de exames laboratoriais é feita aqui, e os resultados ficam disponíveis online.",
    },
  },
  {
    id: "odontologia",
    rotulo: "Odontologia",
    nome: "Sorriso Pleno Odontologia",
    tagline: "Seu sorriso em boas mãos",
    descricao:
      "Clínica odontológica com clínica geral, ortodontia, implantes, odontopediatria e estética dental. Agende pelo WhatsApp.",
    tituloHero: "Tratamento completo para o seu sorriso",
    textoHero:
      "Da limpeza ao implante, com dentistas especializados, tecnologia moderna e agendamento direto pelo WhatsApp.",
    tipoSchema: "Dentist",
    cores: { "50": "#eff6ff", "100": "#dbeafe", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af" },
    especialidades: [
      {
        id: "clinica-geral", titulo: "Clínica geral", icone: "dente", duracao: 40,
        texto: "Limpeza, restaurações e prevenção de cáries.",
        equipe: [
          { nome: "Dr. Lucas Andrade", registro: "CRO 00000-MG", resumo: "Prevenção e restaurações estéticas.", dias: [1, 3, 5] },
          { nome: "Dra. Patrícia Gomes", registro: "CRO 00000-MG", resumo: "Atendimento de pacientes com sensibilidade.", dias: [2, 4, 6] },
          { nome: "Dr. Felipe Moura", registro: "CRO 00000-MG", resumo: "Tratamento de canal (endodontia).", dias: [1, 2, 4] },
        ],
      },
      {
        id: "ortodontia", titulo: "Ortodontia", icone: "alinhador", duracao: 30,
        texto: "Aparelhos fixos e alinhadores transparentes.",
        equipe: [
          { nome: "Dra. Renata Silva", registro: "CRO 00000-MG", resumo: "Alinhadores invisíveis para adultos.", dias: [2, 4] },
          { nome: "Dr. Bruno Teixeira", registro: "CRO 00000-MG", resumo: "Ortodontia infantil e adolescente.", dias: [1, 3, 6] },
        ],
      },
      {
        id: "implantes", titulo: "Implantes", icone: "implante", duracao: 60,
        texto: "Reposição de dentes com segurança e naturalidade.",
        equipe: [
          { nome: "Dr. Marcelo Pinto", registro: "CRO 00000-MG", resumo: "Implantes e próteses fixas.", dias: [2, 5] },
          { nome: "Dra. Aline Barros", registro: "CRO 00000-MG", resumo: "Cirurgia oral e enxertos.", dias: [3, 4] },
        ],
      },
      {
        id: "odontopediatria", titulo: "Odontopediatria", icone: "crianca", duracao: 40,
        texto: "Atendimento lúdico e cuidadoso para crianças.",
        equipe: [
          { nome: "Dra. Larissa Campos", registro: "CRO 00000-MG", resumo: "Primeira consulta do bebê.", dias: [1, 3, 5] },
          { nome: "Dra. Sofia Ribeiro", registro: "CRO 00000-MG", resumo: "Prevenção e selantes.", dias: [2, 6] },
        ],
      },
      {
        id: "estetica-dental", titulo: "Estética dental", icone: "brilho", duracao: 60,
        texto: "Clareamento, facetas e harmonização do sorriso.",
        equipe: [
          { nome: "Dr. André Cardoso", registro: "CRO 00000-MG", resumo: "Facetas em resina e porcelana.", dias: [1, 4] },
          { nome: "Dra. Vanessa Lopes", registro: "CRO 00000-MG", resumo: "Clareamento a laser.", dias: [2, 3, 5] },
          { nome: "Dra. Isabela Freitas", registro: "CRO 00000-MG", resumo: "Planejamento digital do sorriso.", dias: [4, 6] },
        ],
      },
    ],
    depoimentos: [
      { nome: "Cláudia M.", texto: "Tinha medo de dentista e fui super bem recebida. Hoje vou tranquila." },
      { nome: "Eduardo P.", texto: "Fiz meu implante aqui e o resultado ficou muito natural." },
      { nome: "Priscila A.", texto: "Meus filhos adoram a odontopediatra. Atendimento nota dez." },
    ],
    convenios: ["Odontoprev", "Amil Dental", "Bradesco Dental", "Unimed Odonto"],
    perguntaExtra: {
      pergunta: "Vocês atendem urgências, como dor de dente?",
      resposta: "Sim. Reservamos horários todos os dias para urgências. Chame no WhatsApp e informe que é urgente.",
    },
  },
  {
    id: "psicologia",
    rotulo: "Psicologia",
    nome: "Espaço Mente Plena",
    tagline: "Um lugar seguro para cuidar de você",
    descricao:
      "Clínica de psicologia com terapia individual, infantil, de casal e avaliação neuropsicológica. Atendimento presencial e online.",
    tituloHero: "Cuidar da mente também é cuidar da saúde",
    textoHero:
      "Psicólogos experientes, acolhimento sem julgamentos e sessões presenciais ou online. Agende sua primeira conversa.",
    tipoSchema: "MedicalClinic",
    cores: { "50": "#f5f3ff", "100": "#ede9fe", "500": "#8b5cf6", "600": "#7c3aed", "700": "#6d28d9", "800": "#5b21b6" },
    especialidades: [
      {
        id: "terapia-individual", titulo: "Terapia individual", icone: "mente", duracao: 50,
        texto: "Ansiedade, estresse, luto e autoconhecimento.",
        equipe: [
          { nome: "Mariana Costa", registro: "CRP 04/00000", resumo: "Terapia cognitivo-comportamental (TCC).", dias: [1, 3, 5] },
          { nome: "Rodrigo Almeida", registro: "CRP 04/00000", resumo: "Ansiedade e esgotamento profissional.", dias: [2, 4] },
          { nome: "Letícia Moraes", registro: "CRP 04/00000", resumo: "Luto e transições de vida.", dias: [1, 2, 6] },
          { nome: "Henrique Dias", registro: "CRP 04/00000", resumo: "Atendimento online para todo o Brasil.", dias: [3, 4, 5] },
        ],
      },
      {
        id: "psicologia-infantil", titulo: "Psicologia infantil", icone: "crianca", duracao: 50,
        texto: "Desenvolvimento emocional e orientação aos pais.",
        equipe: [
          { nome: "Carolina Batista", registro: "CRP 04/00000", resumo: "Ludoterapia e dificuldades escolares.", dias: [1, 3] },
          { nome: "Daniela Fonseca", registro: "CRP 04/00000", resumo: "Orientação parental.", dias: [2, 5, 6] },
        ],
      },
      {
        id: "terapia-casal", titulo: "Terapia de casal", icone: "casal", duracao: 50,
        texto: "Comunicação, conflitos e fortalecimento do vínculo.",
        equipe: [
          { nome: "Fábio Carvalho", registro: "CRP 04/00000", resumo: "Terapia sistêmica de casal e família.", dias: [2, 4, 6] },
          { nome: "Renata Siqueira", registro: "CRP 04/00000", resumo: "Mediação de conflitos.", dias: [1, 5] },
        ],
      },
      {
        id: "neuropsicologia", titulo: "Avaliação neuropsicológica", icone: "cerebro", duracao: 50,
        texto: "Investigação de TDAH, memória e atenção.",
        equipe: [
          { nome: "Patrícia Leal", registro: "CRP 04/00000", resumo: "Avaliação de TDAH em crianças e adultos.", dias: [3, 4] },
          { nome: "Gustavo Nunes", registro: "CRP 04/00000", resumo: "Memória e envelhecimento.", dias: [1, 2] },
        ],
      },
    ],
    depoimentos: [
      { nome: "A. L.", texto: "Encontrei um espaço de escuta de verdade. Mudou minha forma de lidar com a ansiedade." },
      { nome: "J. e M.", texto: "A terapia de casal nos ajudou a voltar a conversar. Somos muito gratos." },
      { nome: "R. S.", texto: "As sessões online encaixaram na minha rotina. Atendimento muito humano." },
    ],
    convenios: ["Unimed", "Cassi", "SulAmérica"],
    perguntaExtra: {
      pergunta: "As sessões podem ser online?",
      resposta: "Sim. Todos os profissionais atendem online por videochamada, com o mesmo sigilo do atendimento presencial.",
    },
  },
  {
    id: "estetica",
    rotulo: "Estética",
    nome: "Bella Pele Estética",
    tagline: "Beleza com cuidado e ciência",
    descricao:
      "Clínica de estética com dermatologia, estética facial e corporal e depilação a laser. Agende pelo WhatsApp.",
    tituloHero: "Autoestima com resultado e segurança",
    textoHero:
      "Tratamentos faciais e corporais com profissionais qualificados, avaliação personalizada e agendamento pelo WhatsApp.",
    tipoSchema: "BeautySalon",
    cores: { "50": "#fff1f2", "100": "#ffe4e6", "500": "#f43f5e", "600": "#e11d48", "700": "#be123c", "800": "#9f1239" },
    especialidades: [
      {
        id: "dermatologia", titulo: "Dermatologia", icone: "pele", duracao: 30,
        texto: "Acne, manchas, queda de cabelo e saúde da pele.",
        equipe: [
          { nome: "Dra. Fernanda Lacerda", registro: "CRM 00000-MG", resumo: "Dermatologia clínica e estética.", dias: [1, 3] },
          { nome: "Dr. Ricardo Viana", registro: "CRM 00000-MG", resumo: "Tricologia (cabelos e couro cabeludo).", dias: [2, 5] },
        ],
      },
      {
        id: "estetica-facial", titulo: "Estética facial", icone: "rosto", duracao: 60,
        texto: "Limpeza de pele, peelings e rejuvenescimento.",
        equipe: [
          { nome: "Amanda Torres", resumo: "Limpeza de pele e tratamento de acne.", dias: [1, 2, 4] },
          { nome: "Bianca Rezende", resumo: "Peelings e microagulhamento.", dias: [3, 5, 6] },
          { nome: "Natália Couto", resumo: "Protocolos de rejuvenescimento.", dias: [2, 4, 6] },
        ],
      },
      {
        id: "estetica-corporal", titulo: "Estética corporal", icone: "corpo", duracao: 60,
        texto: "Drenagem, modelagem e tratamento de celulite.",
        equipe: [
          { nome: "Priscila Ramos", resumo: "Drenagem linfática e pós-operatório.", dias: [1, 3, 5] },
          { nome: "Débora Matos", resumo: "Modelagem e tratamento de gordura localizada.", dias: [2, 4] },
        ],
      },
      {
        id: "laser", titulo: "Depilação a laser", icone: "laser", duracao: 30,
        texto: "Resultado duradouro, para todos os tipos de pele.",
        equipe: [
          { nome: "Jéssica Pacheco", resumo: "Laser para peles claras e morenas.", dias: [1, 2, 3] },
          { nome: "Tatiane Brito", resumo: "Sessões rápidas no horário de almoço.", dias: [4, 5, 6] },
        ],
      },
    ],
    depoimentos: [
      { nome: "Luana F.", texto: "Minha pele nunca esteve tão bonita. As profissionais são muito atenciosas." },
      { nome: "Carla T.", texto: "Fiz a drenagem no pós-operatório e fez toda a diferença na recuperação." },
      { nome: "Simone B.", texto: "Ambiente lindo, pontualidade e resultado. Já indiquei para as amigas." },
    ],
    convenios: [],
    perguntaExtra: {
      pergunta: "Preciso de avaliação antes do tratamento?",
      resposta: "Sim. A primeira consulta é uma avaliação gratuita para indicar o tratamento mais adequado para você.",
    },
  },
];

// Perguntas que valem para todos os modelos. A de convênios é montada com a lista de cada modelo,
// e a `perguntaExtra` de cada modelo é somada a estas.
export const perguntasComuns = [
  {
    pergunta: "Como faço para agendar?",
    resposta:
      "Escolha a especialidade, o profissional, o dia e o horário no formulário de agendamento. A mensagem chega pronta no WhatsApp da recepção, que confirma o horário com você.",
  },
  {
    pergunta: "Posso remarcar ou cancelar?",
    resposta: "Pode, sem custo, com até 24 horas de antecedência. Basta avisar pelo WhatsApp.",
  },
];

export const modeloPadrao = modelos[0];

export function getModelo(id: string | null | undefined): Modelo {
  return modelos.find((m) => m.id === id) ?? modeloPadrao;
}

export function whatsappLink(message: string) {
  return `https://wa.me/${clinica.whatsapp}?text=${encodeURIComponent(message)}`;
}

// Mensagens enviadas à clínica. (Na demonstração, elas só aparecem na simulação; veja lib/whatsapp.ts.)
export function mensagemClinica(texto: string) {
  return texto;
}

export const NOMES_DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
const ABREV_DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function formatarDias(dias: number[]) {
  const nomes = dias.map((d) => ABREV_DIAS[d]);
  if (nomes.length <= 1) return nomes.join("");
  return `${nomes.slice(0, -1).join(", ")} e ${nomes[nomes.length - 1]}`;
}

export function iniciais(nome: string) {
  const partes = nome.replace(/^Dra?\.\s+/, "").split(" ").filter(Boolean);
  return ((partes[0]?.[0] ?? "") + (partes[partes.length - 1]?.[0] ?? "")).toUpperCase();
}
