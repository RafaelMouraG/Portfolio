import type { Projeto } from './projetos'

// Versão em inglês de content/projetos.ts. Mesmos slugs, mesma ordem —
// lib/i18n.ts confere isso no build. Ao editar um case lá, edite aqui também.
export const projetosEn: Projeto[] = [
  {
    slug: 'atlasleaf',
    titulo: 'AtlasLeaf',
    resumo:
      'A classifier for seven soybean leaf diseases that knows when it does not know: below the confidence threshold, the case is deferred to human review.',
    areas: ['dados'],
    stack: ['Python', 'PyTorch', 'EfficientNet-V2-S', 'ONNX', 'Streamlit'],
    destaque: true,
    links: {
      repo: 'https://github.com/RafaelMouraG/AtlasLeaf',
    },
    case: {
      problema:
        'Identifying soybean leaf disease from a photo looks like a solved image-classification problem. It is not. The real challenge showed up in evaluation: the model scored 98.5% accuracy on validation and fell apart on any image that did not come from the original dataset.',
      abordagem:
        'Transfer learning with EfficientNet-V2-S on the ASDID field dataset, export to ONNX to decouple training from inference, and a confidence-based rejection layer in front of the prediction. The Streamlit interface takes a photo, queries the model, and shows both the predicted class and how much it can be trusted.',
      decisoes:
        'The decision that defined the project was redoing the evaluation protocol with a camera-based split, training on one set of cameras and testing on another. The honest number dropped from 98.5% to 74.6% balanced accuracy on unseen cameras, and it became clear that the previous model was learning the signature of the equipment and the source, not the lesion. The second decision was letting the model abstain: in agronomic diagnosis, a wrong prediction with high confidence costs more than an "I don\'t know". Surveying datasets also surfaced a concrete taxonomic risk, since the "cercospora" label groups Cercospora kikuchii and Cercospora sojina in several sources, even though they are distinct diseases.',
      resultado:
        '74.6% balanced accuracy on unseen cameras, with abstention on low-confidence cases. The lesson I take away predates the model: define the domain split before training anything. I spent weeks optimizing against a metric that did not measure generalization, and no architecture tweak would have fixed that.',
    },
  },
  {
    slug: 'biblioo',
    titulo: 'Biblioo',
    resumo:
      'A social reading network with web, mobile, and API on a production stack. I worked on the backend: user module, asynchronous notifications, AI assistant, and performance testing.',
    areas: ['dev'],
    papel:
      'Team of six. Backend: user module, asynchronous notifications, AI assistant, and performance testing.',
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
    links: {
      repo: 'https://github.com/RafaelMouraG/biblioo',
      demo: 'https://biblioo-rust.vercel.app/',
    },
    case: {
      problema:
        'A social reading network needs more backend than it seems: identity with social login, a graph of who follows whom, search, notifications that cannot go missing and, in the product vision, an assistant that answers and performs actions inside the platform. My front covered four of those — users, notifications, the AI assistant, and the performance of the whole — and each carried a different kind of risk.',
      abordagem:
        'The user module shipped complete: JWT authentication with sign-up, login, refresh, and logout, social login with Google OAuth on top of Spring Security, a follow system, and integrations with OpenSearch, for search, and Cloudinary, for images. Notifications persist first and only then fan out, with a RabbitMQ topic exchange delivering the same event via SSE on the web and FCM on mobile without the producer knowing who is listening. The AI assistant follows the same hexagonal architecture as the rest of the modular monolith: function calling to perform platform actions from natural language, rate limiting, conversation history persisted in Redis, and anti-hallucination guardrails.',
      decisoes:
        'In notifications, the persist-then-publish order was deliberate: it guarantees the notification exists in the database even if the entire fanout fails, turning redelivery into a reprocessing problem rather than a loss problem. In the assistant, the equivalent decision was limiting what it can claim to what it can execute: every action goes through typed function calling, and whatever the model cannot reach through a tool it does not promise — the cheap guardrail that cuts the most expensive hallucination, inventing a platform state. I also replaced cached JPA entities with DTOs after tracing a Redis serialization bug caused by lazy loading, a fix that became a rule for the rest of the project. And the k6 suite, with 71 tests across eight domains under load, spike, and stress profiles, did not stop at measuring: with Prometheus and Grafana pointing at where it hurt, the results went back into the code as optimizations.',
      resultado:
        'System live on Cloud Run, with the web app on Vercel and an offline-first Flutter app. What I would do differently is run load tests during development rather than at the end: the bottlenecks the suite revealed would have changed modeling decisions had I known about them earlier. I joined as the least experienced member of a team of six and left owning three subsystems and the performance suite — it was my closest contact with real architectural decision-making.',
    },
  },
  {
    slug: 'hortifruti-santa-luzia',
    titulo: 'Hortifruti Santa Luzia',
    resumo:
      'Management system for a real fresh-produce retailer, with WhatsApp customer service, payment slips, bank reconciliation, and invoice issuance. Backend and integrations.',
    areas: ['dev'],
    papel: 'Team of six, real client. Backend: communication layer and external integrations.',
    stack: ['Java 21', 'Spring Boot 4', 'MySQL', 'Apache PDFBox', 'Sicoob API', 'Focus NFe', 'Railway'],
    destaque: true,
    capturas: [
      {
        src: '/hortifruti-banner.png',
        alt: 'Hortifruti Santa Luzia brand',
        largura: 1600,
        altura: 400,
      },
    ],
    links: {
      repo: 'https://github.com/marcosffp/hortifruti',
      demo: 'https://www.hortifrutisl.zone.id/',
    },
    case: {
      problema:
        'The client did by hand what the system needed to automate: generating payment slips (boletos), checking bank statements against received payments, and issuing invoices. Bank reconciliation was the most expensive part, because statements arrive as PDFs and every bank lays out its own differently.',
      abordagem:
        'Extraction and categorization of transactions straight from the statement PDF, with a parser that normalizes Sicoob and Banco do Brasil into a single internal format instead of duplicating the reconciliation logic per institution. Around that, integration with the bank API via mTLS with a digital certificate, invoice issuance through Focus NFe, and a WhatsApp Business chatbot through which customers request and receive slips, invoices, and order status, plus email notifications.',
      decisoes:
        'Choosing to normalize at the entry point, rather than scattering per-bank conditionals through the domain, is what kept the code sustainable when the second institution came in. Bank integration with digital certificates leaves little room for error and has scarce documentation, so every call needed explicit validation. Today I would go further: treat every external integration as a boundary, with an anti-corruption layer and its own contract, because each vendor\'s format still leaks into the system more than it should. And I would put queue-backed retries on external calls, since bank APIs go down and, back then, that took the whole flow down with them.',
      resultado:
        'Payment slip generation went from about two hours a day to ten minutes. Bank reconciliation, from four hours a week to fifteen minutes. Grouping, from three hours a week to five minutes. The project ran from kick-off to training the managers, with the system replacing manual processes that existed before it.',
    },
  },
  {
    slug: 'fieldflow',
    titulo: 'FieldFlow',
    resumo:
      'An agricultural services marketplace where hiring runs on asynchronous events. API and mobile app, built solo.',
    areas: ['dev'],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'RabbitMQ', 'Alembic', 'pytest', 'Docker', 'Flutter'],
    destaque: true,
    capturas: [
      {
        src: '/fieldflow-login.png',
        alt: 'FieldFlow app login screen, with an API server selector',
        largura: 1206,
        altura: 2622,
      },
      {
        src: '/fieldflow-home.png',
        alt: 'Producer home screen in FieldFlow, with counters for pending, in-progress, and completed requests',
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
        'A hiring flow between producer and service provider cannot lose messages or execute the same action twice. Asynchronous delivery is at-least-once by nature, which means consumers will receive duplicate events, and the system has to withstand that without duplicating a hire.',
      abordagem:
        'Idempotency by event_id at the consumer, a Dead-Letter Queue to reprocess what failed, and a RabbitMQ topic exchange distributing the flows across two consumer workers independent of the API. The codebase follows Clean Architecture by bounded context, with a Flutter app consuming the API.',
      decisoes:
        'I placed the guarantee in the consumer, not the broker, because no queue configuration solves an application problem: the consumer needs to know it has already seen that event. The DLQ exists to turn failure into a work queue, not into a lost log. The project\'s known debt is the absence of an outbox pattern, which currently leaves the database write and the event publish without a consistency guarantee between them.',
      resultado:
        'The full publish, apply, and hire flow runs on events, with the whole stack coming up via Docker Compose. It started as coursework and I kept going beyond scope on my own, partly to prove that event-driven architecture is a concept, not a framework, stepping away from Java and Spring. If I started over, I would add observability on day one, because debugging an asynchronous flow without event-correlated logs is avoidable suffering.',
    },
  },
  {
    slug: 'biblioteca-de-grafos',
    titulo: 'Graph library and musical similarity network',
    resumo:
      'A directed-graph library with a single API over two internal representations, validated on a similarity network of 156 thousand Spotify artists and 300 thousand real collaborations.',
    areas: ['dados'],
    destaque: true,
    papel: 'Team of five. The library\'s relationship-query layer, plus writing and reviewing the paper.',
    stack: ['Python 3', 'Label Propagation', 'Eigenvector Centrality', 'Gephi'],
    links: {},
    case: {
      problema:
        'Graph libraries tend to couple analysis algorithms to a specific internal representation, adjacency matrix or adjacency list, which prevents reusing the same algorithm when graph density changes and forces you to anticipate, at implementation time, which structure will fit best. The work proposed separating the public API from the concrete implementation explicitly, and proving that separation on a real, large-scale use case.',
      abordagem:
        'An abstract class defines the contract and concentrates everything that does not depend on the internal structure: index and self-loop validation, vertex weights, structural relationship queries, global checks such as connectivity, and GEXF export. Two concrete classes, adjacency matrix and adjacency list, separately implement only what depends on the structure. As a case study, we modeled a similarity network of 156,422 artists and 300,379 collaborations from the Spotify Artist Feature Collaboration Network dataset, treating each recorded feature as observable evidence of musical affinity, and ran Label Propagation to detect communities and Eigenvector Centrality to measure influence.',
      decisoes:
        'The structuring decision was implementing the derived queries in the abstract layer, on top of the adjacency relation already exposed by the API, rather than on each representation\'s internal structure. That is what guarantees identical behavior in both without duplicating code, and it is where it became clear that an abstraction boundary must be drawn before the implementation, not after it. On the domain side, we took collaboration as a proxy for similarity, since the dataset carries no ready-made measure, making the limitation explicit: without intensity on the edge, you cannot tell occasional partnerships from recurring ones. Scale also forced a choice: the adjacency matrix would require about 2.44 × 10¹⁰ elements and became unfeasible, leaving only the list for the full graph.',
      resultado:
        'The separation proved itself in practice. Both algorithms were written once, in terms of getVertexCount and getNeighbors alone, and ran without any change over whichever representation was chosen. The full pipeline executes in about 229 seconds over the entire network. On the domain side, the most interesting finding was that centrality is not popularity: the most central artist has a popularity of 84, below several artists ranked behind them, and what puts them on top is crossing the boundary between the Latin urban scene and American hip-hop, not accumulating connections inside their own community. A very popular artist who always collaborates with the same partners stays structurally peripheral.',
    },
  },
]
