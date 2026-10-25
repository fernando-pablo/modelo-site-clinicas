# Modelo de site para clínicas (Lychnos Tech)

Site institucional para clínicas e consultórios, feito com **Next.js 15 (App Router), TypeScript e Tailwind CSS 4**.
Um único projeto atende quatro tipos de negócio: **clínica médica, odontologia, psicologia e estética**.

> **Projeto de demonstração.** Clínicas, profissionais, registros e depoimentos são fictícios.
> Para um cliente real, troque tudo em `src/lib/site.ts`, usando só depoimentos reais e autorizados.

## O que o visitante encontra
- **Troca de modelo na faixa do topo:** o mesmo site vira clínica médica, odontológica, de psicologia ou de estética,
  mudando nome, cores, especialidades, equipe, depoimentos e dúvidas. Cada versão tem link próprio
  (`?modelo=odontologia`, `?modelo=psicologia`, `?modelo=estetica`).
- **Próximos horários no topo da página:** profissionais com as próximas datas de atendimento; um toque já abre o agendamento preenchido.
- **Especialidades com a quantidade de profissionais** e botão para ver a equipe daquela área.
- **Equipe com filtro por especialidade**, dias de atendimento e botão "Agendar com...".
- **Agendamento por horário:** especialidade, profissional, data, horário, nome e convênio. Os horários são montados
  conforme a duração de cada consulta (`duracao` de cada especialidade em `site.ts`), o funcionamento do dia e a pausa
  do almoço (`clinica.intervalo`). O formulário avisa quando o profissional não atende no dia escolhido e sugere as
  próximas datas. A mensagem sai pronta no WhatsApp.
- **Convênio ou particular (opcional):** ao escolher convênio, aparece a lista dos convênios aceitos por aquele modelo
  (`convenios` em `site.ts`) e o campo da carteirinha. Lista vazia = atendimento somente particular.
- **Depois do envio:** resumo do pedido e botões para salvar um lembrete no Google Agenda ou na agenda do celular (.ics,
  com aviso 2 horas antes). A confirmação oficial continua sendo a resposta da recepção no WhatsApp.
- Na demonstração, cerca de 30% dos horários aparecem como ocupados (sempre os mesmos para cada data e profissional),
  para a agenda parecer real. Com `demo.ativa: false`, todos aparecem livres e a recepção confirma pelo WhatsApp.
- Status "aberto agora / abre às...", dúvidas frequentes, mapa, botão flutuante de WhatsApp.

## Modo demonstração
Em `src/lib/site.ts`, o objeto `demo` controla a faixa do topo e o destino das mensagens:
- `ativa: true` → mostra a faixa "Site modelo da Lychnos Tech", envia todas as mensagens para o WhatsApp de `demo.whatsapp`
  marcadas com **[Teste do modelo de site para clínicas]** e pede ao Google para não indexar a clínica fictícia.
- Para um cliente real: `ativa: false`, troque o `whatsapp`, o endereço e deixe só o modelo do cliente em `modelos`.
- `portfolio`: coloque o link do seu portfólio para o rodapé apontar para ele.

## Como rodar
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
```

## Deploy
Suba o repositório no GitHub e importe na [Vercel](https://vercel.com).

## Estrutura
```
src/
  app/          layout (fontes, SEO, dados estruturados), página, sitemap, robots
  components/   ClinicaDemo (estado e troca de modelo) e as seções da página
  lib/site.ts   todo o conteúdo: modelos, especialidades, equipe, horários, demonstração
  lib/agenda.ts datas, próximos dias de atendimento e horário de funcionamento
```

## Decisões técnicas
- **Cores por variáveis CSS.** Cada modelo define seus tons; o `ClinicaDemo` aplica as variáveis `--color-brand-*`
  e todas as classes `brand` do Tailwind mudam juntas, sem duplicar componentes.
- **Datas só no navegador.** "Aberto agora" e próximos horários dependem do relógio do visitante, então são
  calculados depois que a página carrega, evitando diferença entre servidor e navegador.
- **Sem backend.** O agendamento monta a mensagem e abre o WhatsApp, o canal que a clínica já usa.
- **Sem fotos de pessoas.** Os profissionais fictícios usam iniciais, para não associar rostos reais a nomes inventados.

## Limitações conhecidas
- Sem testes automatizados.
- O agendamento depende da confirmação da recepção pelo WhatsApp: não há agenda em tempo real nem registro dos pedidos.
