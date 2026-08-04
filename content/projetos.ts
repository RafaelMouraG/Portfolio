export type Area = "dados" | "dev";

export type Projeto = {
  slug: string;
  titulo: string;
  resumo: string;
  areas: Area[];
  stack: string[];
  destaque: boolean;
  links: {
    repo?: string;
    demo?: string;
  };
  case: {
    problema: string;
    abordagem: string;
    decisoes: string;
    resultado: string;
  };
};

// [PREENCHER] projetos reais — os quatro abaixo são exemplos realistas de
// estrutura e tom, na composição alvo: 1 dev, 1 dados, 2 híbridos.
export const projetos: Projeto[] = [
  {
    slug: "radar-imoveis",
    titulo: "Radar de Imóveis",
    resumo:
      "Coleta diária de anúncios, modelo de precificação e app que mostra imóveis abaixo do preço de mercado.",
    areas: ["dados", "dev"],
    stack: ["Python", "scikit-learn", "PostgreSQL", "Next.js", "Vercel"],
    destaque: true,
    links: {
      repo: "https://github.com/RafaelMouraG/radar-imoveis",
      demo: "https://radar-imoveis.vercel.app",
    },
    case: {
      problema:
        "Quem procura imóvel não tem como saber se um anúncio está caro ou barato para a região: o preço de referência não é público.",
      abordagem:
        "Scraper diário agendado coleta anúncios e persiste em Postgres; um modelo de regressão treinado sobre o histórico estima o preço esperado por região e características; um app Next.js lista os anúncios com maior desconto sobre o estimado.",
      decisoes:
        "Regressão linear regularizada em vez de gradient boosting: a diferença de erro era pequena e o modelo linear permite explicar o preço estimado ao usuário. Descartei fila de mensagens na ingestão — o volume diário não justificava a complexidade; um cron simples resolve.",
      resultado:
        "Pipeline roda sem intervenção há meses; o app responde em menos de 200ms com previsões pré-calculadas no build do dia.",
    },
  },
  {
    slug: "classificador-chamados",
    titulo: "Classificador de Chamados",
    resumo:
      "API que classifica tickets de suporte por assunto e urgência usando embeddings, com painel de acompanhamento.",
    areas: ["dados", "dev"],
    stack: ["Python", "FastAPI", "Embeddings", "Docker", "Streamlit"],
    destaque: true,
    links: {
      repo: "https://github.com/RafaelMouraG/classificador-chamados",
      demo: "https://classificador-chamados.streamlit.app",
    },
    case: {
      problema:
        "Triagem manual de tickets de suporte consumia horas por dia e chamados urgentes esperavam na fila junto com os triviais.",
      abordagem:
        "API FastAPI recebe o texto do chamado, gera embedding e classifica por similaridade com categorias rotuladas; um painel Streamlit acompanha a distribuição e os casos de baixa confiança, que caem para revisão humana.",
      decisoes:
        "Classificação por similaridade de embeddings em vez de fine-tuning: com poucas centenas de exemplos rotulados, o fine-tuning não pagava o custo. Limiar de confiança explícito — errar encaminhando para humano é barato, errar classificando é caro.",
      resultado:
        "Acurácia de 92% nas categorias principais e triagem automática de 80% do volume, com os 20% ambíguos revisados por pessoa.",
    },
  },
  {
    slug: "api-assinaturas",
    titulo: "API de Assinaturas",
    resumo:
      "API de gestão de assinaturas com autenticação, cobrança recorrente e webhooks, documentada e testada.",
    areas: ["dev"],
    stack: ["Node.js", "Fastify", "PostgreSQL", "JWT", "Docker"],
    destaque: true,
    links: {
      repo: "https://github.com/RafaelMouraG/api-assinaturas",
      demo: "https://api-assinaturas.fly.dev/docs",
    },
    case: {
      problema:
        "Modelar cobrança recorrente de verdade: upgrades no meio do ciclo, inadimplência, reprocessamento de webhook — os casos que tutoriais pulam.",
      abordagem:
        "API REST em Fastify com autenticação JWT, máquina de estados explícita para o ciclo de vida da assinatura e processamento idempotente de webhooks de pagamento.",
      decisoes:
        "Máquina de estados no banco em vez de flags booleanas: transição inválida vira erro de domínio, não bug silencioso. Idempotência por chave de evento porque gateway de pagamento reenvia webhook — processar duas vezes é cobrar duas vezes.",
      resultado:
        "Cobertura de testes acima de 90% nos fluxos de cobrança, documentação OpenAPI navegável e deploy contínuo no Fly.io.",
    },
  },
  {
    slug: "pipeline-precos",
    titulo: "Pipeline de Preços Públicos",
    resumo:
      "Pipeline que consolida preços públicos de combustíveis em um dashboard navegável por região e período.",
    areas: ["dados"],
    stack: ["Python", "dbt", "DuckDB", "GitHub Actions", "Evidence"],
    destaque: true,
    links: {
      repo: "https://github.com/RafaelMouraG/pipeline-precos",
      demo: "https://precos-combustiveis.vercel.app",
    },
    case: {
      problema:
        "Os dados públicos de preços de combustíveis existem, mas espalhados em dezenas de planilhas com esquemas inconsistentes — inutilizáveis para consulta direta.",
      abordagem:
        "Ingestão agendada via GitHub Actions normaliza as planilhas para um esquema único; transformações em dbt sobre DuckDB geram as tabelas analíticas; um dashboard estático publica as séries por região e período.",
      decisoes:
        "DuckDB em vez de um warehouse gerenciado: o volume cabe em um arquivo e o custo é zero, sem perder SQL analítico. Dashboard estático re-renderizado a cada carga em vez de BI conectado — ninguém precisa de dado mais fresco que a fonte, que atualiza semanalmente.",
      resultado:
        "Série histórica completa navegável no browser, atualizada toda semana sem intervenção manual desde o primeiro deploy.",
    },
  },
];

// Validação em tempo de build: cada filtro precisa de pelo menos 2 projetos,
// senão a grade filtrada trabalha contra a tese do portfólio.
const MINIMO_POR_FILTRO = 2;
for (const area of ["dados", "dev"] as const) {
  const total = projetos.filter((p) => p.areas.includes(area)).length;
  if (total < MINIMO_POR_FILTRO) {
    console.warn(
      `[content/projetos] o filtro "${area}" tem ${total} projeto(s); o mínimo esperado é ${MINIMO_POR_FILTRO}.`,
    );
  }
}
