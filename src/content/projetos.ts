export type Area = 'dados' | 'dev'

export type Projeto = {
  slug: string
  titulo: string
  resumo: string
  areas: Area[]
  stack: string[]
  destaque: boolean
  // Preencher só em projeto de equipe. Aparece no topo do case, com o
  // rótulo "Papel".
  papel?: string
  // Etiqueta de estágio para projeto que ainda não terminou ("em andamento").
  // Sem ela, o projeto é tratado como concluído.
  estado?: string
  // Cada projeto é desenhado como o mecanismo que ele resolve: a animação em
  // components/figuras/ é escolhida pelo slug, e o texto dela mora aqui.
  // `titulo` é a legenda curta da moldura; `legenda` explica o que se move.
  figura: { titulo: string; legenda: string }
  // Leituras grandes no case, em fonte de matriz de pontos. Só números que
  // já estão no texto do case: a leitura resume, não acrescenta.
  numeros?: Array<{ valor: string; rotulo: string }>
  // Comparação animada de/para no case (barras que encolhem ou caem).
  // Valores na mesma unidade dentro de cada item; minutos viram "h" sozinhos.
  medidas?: {
    titulo: string
    rotuloDe: string
    rotuloPara: string
    itens: Array<{ rotulo: string; de: number; para: number; unidade: '%' | 'min'; periodo?: string }>
    nota?: string
  }
  // Capturas exibidas em galeria na página de case (não no card). Ideal para
  // screenshot de celular, que não cabe no formato da figura.
  capturas?: Array<{ src: string; alt: string; largura: number; altura: number }>
  links: { repo?: string; demo?: string; video?: string }
  case: {
    problema: string
    abordagem: string
    decisoes: string
    resultado: string
  }
}

export const projetos: Projeto[] = [
  {
    slug: 'atlasleaf',
    titulo: 'AtlasLeaf',
    resumo:
      'Classificador de sete doenças foliares de soja que sabe quando não sabe: abaixo do limiar de confiança, o caso é deferido para revisão humana.',
    // TROCAR para ['dados', 'dev'] assim que a API estiver no ar.
    // Enquanto o modelo só roda local, manter apenas 'dados'.
    areas: ['dados'],
    stack: ['Python', 'PyTorch', 'EfficientNet-V2-S', 'ONNX', 'Streamlit'],
    destaque: true,
    figura: {
      titulo: 'Sabe quando não sabe',
      legenda:
        'A varredura gera uma confiança para cada uma das sete classes. Acima do limiar, a predição sai; abaixo dele, o modelo se abstém e o caso vai para revisão humana.',
    },
    numeros: [
      { valor: '7', rotulo: 'doenças foliares de soja' },
      { valor: '74,6%', rotulo: 'acurácia balanceada em câmera não vista' },
    ],
    medidas: {
      titulo: 'O número honesto',
      rotuloDe: 'validação original',
      rotuloPara: 'câmera não vista',
      itens: [{ rotulo: 'Acurácia', de: 98.5, para: 74.6, unidade: '%' }],
      nota: 'O primeiro número media a assinatura da câmera, não a lesão. O segundo é o que o modelo entrega fora do dataset.',
    },
    links: {
      repo: 'https://github.com/RafaelMouraG/AtlasLeaf',
      // demo: preencher quando a API subir
    },
    case: {
      problema:
        'Identificar doença foliar de soja a partir de uma foto parece um problema resolvido de classificação de imagem. Não é. O desafio real apareceu na avaliação: o modelo marcava 98,5% de acurácia na validação e desmoronava em qualquer imagem que não viesse do dataset original.',
      abordagem:
        'Transfer learning com EfficientNet-V2-S sobre o dataset ASDID, exportação para ONNX para desacoplar treino de inferência, e uma camada de rejeição por confiança na frente da predição. A interface em Streamlit recebe a foto, consulta o modelo e mostra tanto a classe quanto o quanto se pode confiar nela.',
      decisoes:
        'A decisão que definiu o projeto foi refazer o protocolo de avaliação com split por câmera, treinando em um conjunto de câmeras e testando em outro. O número honesto caiu de 98,5% para 74,6% de acurácia balanceada em câmera não vista, e ficou claro que o modelo anterior aprendia a assinatura do equipamento e da fonte, não a lesão. A segunda decisão foi deixar o modelo se abster: em diagnóstico agronômico, uma predição errada com alta confiança custa mais caro que um "não sei". No levantamento de datasets apareceu ainda um risco taxonômico concreto, já que o rótulo "cercospora" agrupa Cercospora kikuchii e Cercospora sojina em várias fontes, apesar de serem doenças distintas.',
      resultado:
        '74,6% de acurácia balanceada em câmera não vista, com abstenção nos casos de baixa confiança. O aprendizado que levo é anterior ao modelo: definir o split por domínio antes de treinar qualquer coisa. Passei semanas otimizando em cima de uma métrica que não media generalização, e nenhum ajuste de arquitetura teria consertado isso.',
    },
  },
  {
    slug: 'llm-bench',
    titulo: 'llm-bench',
    resumo:
      'Mini benchmark exploratório de agentes de programação: cada configuração (modelo, harness e skills) implementa a mesma API num container isolado, e um avaliador automatizado verifica 35 requisitos na entrega congelada.',
    areas: ['dados', 'dev'],
    estado: 'em andamento',
    stack: ['Python', 'Go', 'Docker', 'GQM'],
    destaque: true,
    figura: {
      titulo: 'Mesma tarefa, containers isolados',
      legenda:
        'Uma tentativa por vez, cada uma num container novo e sem acesso às outras. A entrega é congelada e vai para o avaliador, que confere os 35 requisitos num ambiente limpo.',
    },
    numeros: [
      { valor: '35', rotulo: 'requisitos verificados por entrega' },
      { valor: '4', rotulo: 'configurações na coleta' },
      { valor: '1', rotulo: 'container novo por tentativa' },
      { valor: '1800 s', rotulo: 'de prazo por tentativa' },
    ],
    links: {
      repo: 'https://github.com/RafaelMouraG/llm-bench',
    },
    case: {
      problema:
        'Comparar agentes de programação costuma virar ranking de modelo, mas o que se usa no dia a dia é uma configuração inteira: o modelo, o harness que o executa e as skills carregadas. Medir isso exige responder antes o que exatamente está sendo comparado, com que evidência e em que condições, senão o número final mede o experimento, e não os agentes.',
      abordagem:
        'Parti da GQM: um objetivo, nove perguntas e métricas rastreáveis a elas, cobrindo correção funcional, robustez, manutenibilidade, eficiência e o desempenho da API entregue. A tarefa é um encurtador de URL com contrato HTTP fechado e stack livre. Cada tentativa roda num container novo, sem histórico, memórias ou acesso a outras entregas, com rede restrita a registros de pacotes por um proxy. A entrega é congelada e vai para um avaliador automatizado que verifica os 35 requisitos de aceitação em ambiente limpo, inclusive durabilidade depois de SIGTERM e reinício, e mede latência com um gerador de carga em Go.',
      decisoes:
        'O objeto comparado é a configuração completa, e não o modelo: as diferenças entre harnesses são intencionais, e o desenho não permite atribuir um resultado só ao modelo. Não existe nota geral agregada, porque tempo, custo, correção e rubrica significam coisas diferentes; cada configuração ganha um perfil. A rubrica qualitativa é ordinal, sem média aritmética. Dado ausente fica ausente, não vira zero, e a semântica de tokens de cada harness é registrada, já que o Codex conta cache dentro da entrada e o Claude Code conta à parte. E o piloto serve para validar o instrumento, não para escolher condições que favoreçam alguém.',
      resultado:
        'O piloto com a tarefa real está concluído: as quatro configurações da coleta tiveram a entrega aceita, 35 de 35 requisitos, sem intervenção humana. Ele também pegou defeitos do próprio instrumento, como um binário que faltava na imagem e uma exportação de sessão que falhava, que teriam contaminado a coleta. Com uma tentativa por configuração, o estudo descreve uma execução de cada uma e não separa efeito de variação; essa limitação está escrita antes da coleta, e não depois. A coleta oficial é o próximo passo.',
    },
  },
  {
    slug: 'biblioo',
    titulo: 'Biblioo',
    resumo:
      'Rede social de leitura com web, mobile e API em stack de produção. Atuei no backend: módulo de usuários, notificações assíncronas, assistente de IA e testes de performance.',
    areas: ['dev'],
    papel:
      'Equipe de seis. Backend: módulo de usuários, notificações assíncronas, assistente de IA e testes de performance. Melhor trabalho da turma.',
    stack: [
      'Java 25',
      'Spring Boot 4',
      'RabbitMQ',
      'Redis',
      'OpenSearch',
      'MySQL',
      'FCM',
      'k6',
      'Cloud Run',
    ],
    destaque: true,
    figura: {
      titulo: 'Persistir antes do fanout',
      legenda:
        'A notificação é gravada antes de sair pelo topic exchange para web (SSE) e mobile (FCM). Se um canal falha, ela continua no banco e o reenvio vira reprocessamento, não perda.',
    },
    numeros: [
      { valor: '71', rotulo: 'testes k6' },
      { valor: '8', rotulo: 'domínios cobertos' },
      { valor: '3', rotulo: 'perfis: load, spike e stress' },
      { valor: '3', rotulo: 'subsistemas sob minha responsabilidade' },
    ],
    links: {
      repo: 'https://github.com/RafaelMouraG/biblioo',
      demo: 'https://biblioo-rust.vercel.app/',
    },
    case: {
      problema:
        'Uma rede social de leitura precisa de mais backend do que parece: identidade com login social, um grafo de quem segue quem, busca, notificação que não pode sumir e, na visão do produto, um assistente que responde e executa ações dentro da plataforma. Minha frente cobriu quatro dessas coisas — usuários, notificações, o assistente de IA e a performance do conjunto — e cada uma tinha um tipo diferente de risco.',
      abordagem:
        'O módulo de usuários saiu completo: autenticação JWT com registro, login, refresh e logout, login social com Google OAuth sobre Spring Security, sistema de follow e as integrações com OpenSearch, para busca, e Cloudinary, para imagens. As notificações persistem primeiro e só depois fazem fanout, com topic exchange no RabbitMQ entregando o mesmo evento por SSE no web e por FCM no mobile sem que o produtor saiba quem está escutando. O assistente de IA segue a mesma arquitetura hexagonal do resto do monólito modular: function calling para executar ações da plataforma a partir de linguagem natural, rate limiting, histórico de conversa persistido em Redis e guardrails contra alucinação.',
      decisoes:
        'Nas notificações, a ordem persistir e depois publicar foi deliberada: garante que a notificação exista no banco mesmo que todo o fanout falhe, e o reenvio vira um problema de reprocessamento, não de perda. No assistente, a decisão equivalente foi limitar o que ele pode afirmar ao que consegue executar: toda ação passa por function calling tipado, e o que o modelo não alcança por ferramenta ele não promete — o guardrail barato que corta a alucinação mais cara, a de inventar um estado da plataforma. Também troquei o cache de entidades JPA por DTOs depois de rastrear um bug de serialização no Redis causado por lazy loading, correção que virou regra para o resto do projeto. E a suíte k6, com 71 testes em oito domínios nos perfis load, spike e stress, não ficou só medindo: com Prometheus e Grafana apontando onde doía, os resultados voltaram para o código como otimização.',
      resultado:
        'Sistema no ar em Cloud Run, com web na Vercel e app Flutter offline-first. O que eu faria diferente é rodar carga durante o desenvolvimento e não no fim: os gargalos que a suíte revelou teriam mudado decisões de modelagem se eu soubesse deles antes. Entrei como o membro menos experiente de uma equipe de seis e saí como dono de três subsistemas e da suíte de performance — foi onde tive contato mais próximo com decisão de arquitetura real.',
    },
  },
  {
    slug: 'hortifruti-santa-luzia',
    titulo: 'Hortifruti Santa Luzia',
    resumo:
      'Sistema de gestão para um hortifruti real, com atendimento por WhatsApp, boleto, conciliação bancária e emissão fiscal. Backend e integrações.',
    areas: ['dev'],
    papel: 'Equipe de seis, cliente real. Backend: camada de comunicação e integrações externas.',
    stack: ['Java 21', 'Spring Boot 4', 'MySQL', 'Apache PDFBox', 'API Sicoob', 'Focus NFe', 'Railway'],
    destaque: true,
    figura: {
      titulo: 'Normalizar na entrada',
      legenda:
        'Extratos em PDF de dois bancos passam pelo mesmo parser e saem num formato interno único, que a conciliação confere contra os pagamentos esperados.',
    },
    medidas: {
      titulo: 'Antes e depois',
      rotuloDe: 'à mão',
      rotuloPara: 'com o sistema',
      itens: [
        { rotulo: 'Geração de boletos', de: 120, para: 10, unidade: 'min', periodo: 'por dia' },
        { rotulo: 'Conciliação bancária', de: 240, para: 15, unidade: 'min', periodo: 'por semana' },
        { rotulo: 'Agrupamento', de: 180, para: 5, unidade: 'min', periodo: 'por semana' },
      ],
    },
    capturas: [
      {
        src: '/hortifruti-banner.png',
        alt: 'Marca do Hortifruti Santa Luzia',
        largura: 1600,
        altura: 400,
      },
    ],
    links: {
      repo: 'https://github.com/marcosffp/hortifruti',
      // CONFERIR qual URL está viva antes de publicar.
      // O README do repo aponta para https://hortifruti-two.vercel.app/landing
      demo: 'https://www.hortifrutisl.zone.id/',
    },
    case: {
      problema:
        'O cliente fazia na mão o que o sistema precisava automatizar: gerar boleto, conferir extrato contra pagamento recebido e emitir nota. A conciliação bancária era a parte mais cara, porque o extrato chega em PDF e cada banco monta o seu de um jeito diferente.',
      abordagem:
        'Extração e categorização das transações direto do PDF do extrato, com um parser que normaliza Sicoob e Banco do Brasil para um formato interno único, em vez de duplicar a lógica de conciliação por instituição. Em volta disso, integração com a API bancária via mTLS com certificado digital, emissão fiscal pela Focus NFe e um chatbot de WhatsApp Business por onde o cliente pede e recebe boleto, nota fiscal e o status do pedido, além das notificações por e-mail.',
      decisoes:
        'A escolha de normalizar na entrada, e não espalhar condicional por banco no domínio, foi o que manteve o código sustentável quando entrou a segunda instituição. Integração bancária com certificado digital tem pouca margem para erro e documentação escassa, então cada chamada precisou de validação explícita. Hoje eu iria além: trataria toda integração externa como fronteira, com camada de anticorrupção e contrato próprio, porque o formato de cada fornecedor ainda vaza mais do que deveria para dentro do sistema. E colocaria retry com fila nas chamadas externas, já que API de banco cai e na época isso derrubava o fluxo inteiro.',
      resultado:
        'Geração de boletos caiu de cerca de duas horas por dia para dez minutos. Conciliação bancária, de quatro horas por semana para quinze minutos. Agrupamento, de três horas por semana para cinco minutos. O projeto foi do kick-off ao treinamento dos gestores, com o sistema substituindo processos manuais que existiam antes.',
    },
  },
  {
    slug: 'fieldflow',
    titulo: 'FieldFlow',
    resumo:
      'Marketplace de serviços agrícolas onde a contratação roda por eventos assíncronos. API e app mobile, construído sozinho.',
    areas: ['dev'],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'RabbitMQ', 'Alembic', 'pytest', 'Docker', 'Flutter'],
    destaque: true,
    figura: {
      titulo: 'Idempotência no consumidor',
      legenda:
        'A entrega é at-least-once: o mesmo evento pode chegar duas vezes. O worker guarda os event_id já vistos e ignora a repetição; o que falha de novo e de novo vai para a DLQ, não para um log perdido.',
    },
    capturas: [
      {
        src: '/fieldflow-login.png',
        alt: 'Tela de login do app FieldFlow, com seletor de servidor da API',
        largura: 1206,
        altura: 2622,
      },
      {
        src: '/fieldflow-home.png',
        alt: 'Tela inicial do produtor no FieldFlow, com contadores de solicitações aguardando, em andamento e concluídas',
        largura: 1206,
        altura: 2622,
      },
    ],
    links: {
      repo: 'https://github.com/RafaelMouraG/FieldFLow',
      video: 'https://youtu.be/SOb5KJmm8G0',
    },
    case: {
      problema:
        'Fluxo de contratação entre produtor e prestador não pode perder mensagem nem executar a mesma ação duas vezes. Entrega assíncrona é at-least-once por natureza, o que significa que o consumidor vai receber evento repetido, e o sistema precisa aguentar isso sem duplicar contratação.',
      abordagem:
        'Idempotência por event_id no consumidor, Dead-Letter Queue para reprocessar o que falhou, e topic exchange no RabbitMQ distribuindo os fluxos entre dois workers consumidores independentes da API. A organização segue Clean Architecture por bounded context, com o app Flutter consumindo a API.',
      decisoes:
        'Coloquei a garantia no consumidor e não no broker, porque nenhuma configuração de fila resolve o problema de aplicação: o consumidor precisa saber que já viu aquele evento. A DLQ existe para transformar falha em fila de trabalho, e não em log perdido. A dívida conhecida do projeto é a ausência de outbox pattern, que hoje deixa a gravação no banco e a publicação do evento sem garantia de consistência entre as duas.',
      resultado:
        'Fluxo completo de publicação, candidatura e contratação rodando por eventos, com a stack inteira subindo via Docker Compose. Comecei como trabalho de disciplina e segui além do escopo por conta própria, em parte para provar que arquitetura orientada a eventos é conceito, não framework, saindo do Java e do Spring. Se recomeçasse, colocaria observabilidade no primeiro dia, porque depurar fluxo assíncrono sem log correlacionado por evento é sofrimento evitável.',
    },
  },
  {
    slug: 'biblioteca-de-grafos',
    titulo: 'Biblioteca de grafos e rede de similaridade musical',
    resumo:
      'Biblioteca de grafos direcionados com API única sobre duas representações internas, validada numa rede de similaridade entre 156 mil artistas do Spotify e 300 mil colaborações reais.',
    areas: ['dados'],
    destaque: true,
    figura: {
      titulo: 'Centralidade não é popularidade',
      legenda:
        'Label Propagation separa as comunidades. A Eigenvector Centrality põe no topo quem atravessa a fronteira entre elas, e não quem acumula conexões dentro de uma só.',
    },
    numeros: [
      { valor: '156.422', rotulo: 'artistas' },
      { valor: '300.379', rotulo: 'colaborações reais' },
      { valor: '≈229 s', rotulo: 'pipeline completo sobre a rede inteira' },
      { valor: '2,44 × 10¹⁰', rotulo: 'células que a matriz exigiria' },
    ],
    papel: 'Equipe de cinco. Camada de consultas de relacionamento da biblioteca, redação e revisão do artigo.',
    stack: ['Python 3', 'Label Propagation', 'Eigenvector Centrality', 'Gephi'],
    links: {
      // repo: conferir visibilidade (o endereço atual retorna 404 para quem não está logado)
    },
    case: {
      problema:
        'Bibliotecas de grafo costumam acoplar os algoritmos de análise a uma representação interna específica, matriz ou lista de adjacência, o que impede reutilizar o mesmo algoritmo quando a densidade do grafo muda e obriga a antecipar, na implementação, qual estrutura será mais adequada. O trabalho propôs separar explicitamente a API pública da implementação concreta, e provar essa separação num caso de uso real de grande escala.',
      abordagem:
        'Uma classe abstrata define o contrato e concentra tudo que independe da estrutura interna: validação de índices e laços, pesos de vértice, consultas estruturais de relacionamento, verificações globais como conectividade e exportação para GEXF. Duas classes concretas, matriz e lista de adjacência, implementam separadamente apenas o que depende da estrutura. Como estudo de caso, modelamos uma rede de similaridade entre 156.422 artistas e 300.379 colaborações do dataset Spotify Artist Feature Collaboration Network, tratando cada feature registrada como evidência observável de afinidade musical, e rodamos Label Propagation para detectar comunidades e Eigenvector Centrality para medir influência.',
      decisoes:
        'A decisão que estrutura o projeto foi implementar as consultas derivadas na camada abstrata, sobre a relação de adjacência já exposta pela API, e não sobre a estrutura interna de cada representação. É isso que garante comportamento idêntico nas duas sem duplicar código, e foi onde ficou claro que a fronteira da abstração precisa ser desenhada antes da implementação, não depois. No domínio, assumimos a colaboração como aproximação da similaridade, já que o dataset não traz medida pronta, deixando explícita a limitação: sem intensidade na aresta, não dá para distinguir parceria esporádica de recorrente. A escala também impôs escolha: a matriz de adjacência exigiria cerca de 2,44 × 10¹⁰ elementos e ficou inviável, restando só a lista para o grafo completo.',
      resultado:
        'A separação se provou na prática. Os dois algoritmos foram escritos uma única vez, em termos apenas de getVertexCount e getNeighbors, e rodaram sem nenhuma alteração sobre a representação escolhida. O pipeline completo executa em cerca de 229 segundos sobre a rede inteira. Do lado do domínio, o achado mais interessante foi que centralidade não é popularidade: o artista mais central tem popularidade 84, abaixo de vários que aparecem atrás dele no ranqueamento, e o que o coloca no topo é atravessar a fronteira entre a cena urbana latina e o hip-hop americano, não acumular conexões dentro da própria comunidade. Um artista muito popular que colabora sempre com os mesmos parceiros fica estruturalmente periférico.',
    },
  },
]

// Validação em tempo de build: cada filtro precisa de pelo menos 2 projetos,
// senão a grade filtrada trabalha contra a tese do portfólio.
const MINIMO_POR_FILTRO = 2
for (const area of ['dados', 'dev'] as const) {
  const total = projetos.filter((p) => p.areas.includes(area)).length
  if (total < MINIMO_POR_FILTRO) {
    console.warn(
      `[content/projetos] o filtro "${area}" tem ${total} projeto(s); o mínimo esperado é ${MINIMO_POR_FILTRO}.`,
    )
  }
}
