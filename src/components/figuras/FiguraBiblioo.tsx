import type { Idioma } from "@/lib/i18n";
import { Pacote, Piscar, Viagem } from "./smil";

/*
 * Biblioo — "persistir antes do fanout". Laço de 10 s em dois atos:
 * 1) caminho feliz: o evento é gravado, passa pelo topic exchange e chega
 *    ao web (SSE) e ao mobile (FCM);
 * 2) o FCM falha no meio do caminho, mas a notificação já está no banco:
 *    o reenvio sai de lá, como reprocessamento, e o celular recebe mesmo assim.
 */
const T = 10;
export const poseBiblioo = 9.5;

const rotulos = {
  pt: {
    evento: "evento",
    seguir: "follow",
    salvo: "✓ salvo",
    topic: "topic",
    filaWeb: "fila web",
    filaMobile: "fila mobile",
    web: "web · sse",
    mobile: "mobile · fcm",
    falhou: "fcm falhou",
    reprocessa: "reprocessa a partir do banco",
  },
  en: {
    evento: "event",
    seguir: "follow",
    salvo: "✓ stored",
    topic: "topic",
    filaWeb: "web queue",
    filaMobile: "mobile queue",
    web: "web · sse",
    mobile: "mobile · fcm",
    falhou: "fcm failed",
    reprocessa: "reprocessed from the database",
  },
};

const P1 = "M84 150 H114";
const P2 = "M166 150 H220";
const P3 = "M252 150 C270 150 268 90 288 90";
const P4 = "M252 150 C270 150 268 210 288 210";
const P5 = "M340 90 H380";
const P6 = "M340 210 H404";
const P6_QUEBRADO = "M340 210 H370";
const REENVIO = "M140 174 C140 262 300 272 420 242";

// Instantes de cada ato: [origem→banco, banco→exchange, exchange→filas, filas→clientes]
function passos(inicio: number) {
  return {
    p1: [inicio + 0.2, inicio + 0.8] as const,
    p2: [inicio + 1.2, inicio + 1.8] as const,
    p34: [inicio + 1.8, inicio + 2.5] as const,
    p56: [inicio + 2.9, inicio + 3.4] as const,
  };
}

export function FiguraBiblioo({ idioma }: { idioma: Idioma }) {
  const r = rotulos[idioma];
  const a = passos(0);
  const b = passos(5);

  return (
    <svg viewBox="0 0 480 300" className="block h-auto w-full">
      {/* conexões */}
      <g className="f-linha" strokeOpacity="0.55">
        <path d={P1} />
        <path d={P2} />
        <path d={P3} />
        <path d={P4} />
        <path d={P5} />
        <path d={P6} />
      </g>

      {/* origem */}
      <text x="16" y="124" className="f-texto">{r.evento}</text>
      <rect x="16" y="132" width="68" height="36" rx="4" className="f-caixa" />
      <text x="50" y="154" textAnchor="middle" className="f-texto f-texto-forte">{r.seguir}</text>

      {/* banco: a notificação existe antes de qualquer fanout */}
      <g className="f-caixa">
        <path d="M116 128 V172 C116 181 164 181 164 172 V128" />
        <ellipse cx="140" cy="128" rx="24" ry="8" />
      </g>
      <path d="M116 150 C116 159 164 159 164 150" className="f-linha" strokeOpacity="0.5" />
      <text x="140" y="198" textAnchor="middle" className="f-texto">mysql</text>
      <Piscar T={T} em={[[a.p1[1], 4.7], [b.p1[1], 9.85]]}>
        <text x="140" y="110" textAnchor="middle" className="f-texto f-texto-sinal">{r.salvo}</text>
      </Piscar>
      <Piscar T={T} em={[[a.p1[1], a.p1[1] + 0.5], [b.p1[1], b.p1[1] + 0.5]]}>
        <ellipse cx="140" cy="128" rx="24" ry="8" fill="var(--signal-soft)" stroke="var(--signal)" strokeWidth="1.25" />
      </Piscar>

      {/* exchange */}
      <path d="M236 134 L252 150 L236 166 L220 150 Z" className="f-caixa" />
      <text x="236" y="188" textAnchor="middle" className="f-texto">{r.topic}</text>

      {/* filas */}
      {[
        { y: 90, rotulo: r.filaWeb, ry: 70 },
        { y: 210, rotulo: r.filaMobile, ry: 242 },
      ].map(({ y, rotulo, ry }) => (
        <g key={y}>
          <text x="288" y={ry} className="f-texto">{rotulo}</text>
          <rect x="288" y={y - 12} width="52" height="24" rx="3" className="f-caixa" />
          {[294, 310, 326].map((x) => (
            <rect key={x} x={x} y={y - 7} width="12" height="14" rx="1.5" className="f-linha" strokeOpacity="0.5" />
          ))}
          <Piscar T={T} em={[[a.p34[1], a.p34[1] + 0.4], [b.p34[1], b.p34[1] + 0.4]]}>
            <rect x="294" y={y - 7} width="12" height="14" rx="1.5" fill="var(--signal)" />
          </Piscar>
        </g>
      ))}

      {/* web */}
      <rect x="380" y="66" width="82" height="48" rx="4" className="f-caixa" />
      <line x1="380" y1="77" x2="462" y2="77" className="f-linha" strokeOpacity="0.6" />
      {[386, 392, 398].map((x) => (
        <circle key={x} cx={x} cy="71.5" r="1.6" fill="var(--muted)" />
      ))}
      <line x1="390" y1="90" x2="440" y2="90" className="f-linha" strokeOpacity="0.4" />
      <line x1="390" y1="100" x2="426" y2="100" className="f-linha" strokeOpacity="0.4" />
      <text x="380" y="132" className="f-texto">{r.web}</text>

      {/* mobile */}
      <rect x="404" y="178" width="34" height="62" rx="6" className="f-caixa" />
      <line x1="416" y1="233" x2="426" y2="233" className="f-linha" strokeOpacity="0.6" />
      <text x="380" y="262" className="f-texto">{r.mobile}</text>

      {/* avisos que chegam */}
      <Piscar T={T} em={[[a.p56[1], 4.8], [b.p56[1], 9.85]]}>
        <circle cx="460" cy="68" r="9" fill="var(--signal)" opacity="0.18" />
        <circle cx="460" cy="68" r="4.5" fill="var(--signal)" />
      </Piscar>
      <Piscar T={T} em={[[a.p56[1], 4.8], [9.3, 9.85]]}>
        <circle cx="436" cy="180" r="9" fill="var(--signal)" opacity="0.18" />
        <circle cx="436" cy="180" r="4.5" fill="var(--signal)" />
      </Piscar>

      {/* ato 1: caminho feliz */}
      <Viagem T={T} d={P1} de={a.p1[0]} ate={a.p1[1]}><Pacote /></Viagem>
      <Viagem T={T} d={P2} de={a.p2[0]} ate={a.p2[1]}><Pacote /></Viagem>
      <Viagem T={T} d={P3} de={a.p34[0]} ate={a.p34[1]}><Pacote /></Viagem>
      <Viagem T={T} d={P4} de={a.p34[0]} ate={a.p34[1]}><Pacote /></Viagem>
      <Viagem T={T} d={P5} de={a.p56[0]} ate={a.p56[1]}><Pacote /></Viagem>
      <Viagem T={T} d={P6} de={a.p56[0]} ate={a.p56[1]}><Pacote /></Viagem>

      {/* ato 2: o FCM cai no meio do caminho */}
      <Viagem T={T} d={P1} de={b.p1[0]} ate={b.p1[1]}><Pacote /></Viagem>
      <Viagem T={T} d={P2} de={b.p2[0]} ate={b.p2[1]}><Pacote /></Viagem>
      <Viagem T={T} d={P3} de={b.p34[0]} ate={b.p34[1]}><Pacote /></Viagem>
      <Viagem T={T} d={P4} de={b.p34[0]} ate={b.p34[1]}><Pacote /></Viagem>
      <Viagem T={T} d={P5} de={b.p56[0]} ate={b.p56[1]}><Pacote /></Viagem>
      <Viagem T={T} d={P6_QUEBRADO} de={b.p56[0]} ate={b.p56[0] + 0.3}><Pacote /></Viagem>
      <Piscar T={T} em={[[b.p56[0] + 0.3, 9.85]]}>
        <g stroke="var(--signal)" strokeWidth="1.75" strokeLinecap="round">
          <line x1="366" y1="204" x2="378" y2="216" />
          <line x1="378" y1="204" x2="366" y2="216" />
        </g>
        <text x="338" y="196" className="f-texto f-texto-sinal">{r.falhou}</text>
      </Piscar>

      {/* reenvio a partir do que já estava gravado */}
      <Piscar T={T} em={[[8.4, 9.85]]}>
        <path d={REENVIO} className="f-linha f-sinal f-tracejado" />
        <text x="150" y="288" className="f-texto f-texto-sinal">{r.reprocessa}</text>
      </Piscar>
      <Viagem T={T} d={REENVIO} de={8.5} ate={9.3}><Pacote /></Viagem>
    </svg>
  );
}
