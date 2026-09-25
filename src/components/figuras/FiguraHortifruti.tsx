import type { Idioma } from "@/lib/i18n";
import { Piscar, Viagem } from "./smil";

/*
 * Hortifruti — "normalizar na entrada". Laço de 9 s: linhas de dois extratos
 * em PDF, cada banco com o seu desenho de linha, entram no mesmo parser e
 * saem todas no mesmo formato para o livro de lançamentos. No fim, a
 * conciliação marca linha por linha.
 */
const T = 9;
export const poseHortifruti = 8.2;

const rotulos = {
  pt: {
    extratos: "extratos em pdf",
    parser: "parser",
    formato: "formato único",
    lancamentos: "lançamentos",
    conciliado: "conciliado ✓",
  },
  en: {
    extratos: "pdf statements",
    parser: "parser",
    formato: "one format",
    lancamentos: "ledger",
    conciliado: "reconciled ✓",
  },
};

// Linhas de origem: pares no Sicoob, ímpares no Banco do Brasil
const origem = [62, 198, 90, 226, 118, 254];
const destino = [88, 116, 144, 172, 200, 228];

function momento(i: number) {
  const partida = 0.3 + i * 0.72;
  return {
    entra: [partida, partida + 0.6] as const,
    sai: [partida + 0.75, partida + 1.35] as const,
  };
}

// Cada banco monta a linha do seu jeito…
function LinhaSicoob({ y }: { y: number }) {
  return (
    <g fill="var(--muted)" opacity="0.8">
      <rect x="28" y={y - 2} width="12" height="4" rx="1" />
      <rect x="46" y={y - 2} width="30" height="4" rx="1" />
      <rect x="82" y={y - 2} width="14" height="4" rx="1" />
    </g>
  );
}
function LinhaBB({ y }: { y: number }) {
  return (
    <g opacity="0.8">
      <rect x="28" y={y - 2} width="16" height="4" rx="1" fill="var(--muted)" />
      <line x1="50" y1={y} x2="96" y2={y} stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="1.5 3" />
    </g>
  );
}
// …e o parser devolve sempre a mesma forma
function LinhaUnica({ y }: { y: number }) {
  return (
    <g fill="var(--foreground)" opacity="0.75">
      <rect x="328" y={y - 2.5} width="12" height="5" rx="1" />
      <rect x="346" y={y - 2.5} width="46" height="5" rx="1" />
      <rect x="400" y={y - 2.5} width="20" height="5" rx="1" />
    </g>
  );
}

function Documento({ y, nome }: { y: number; nome: string }) {
  return (
    <g>
      <path d={`M20 ${y} H92 L104 ${y + 12} V${y + 102} H20 Z`} className="f-caixa" />
      <path d={`M92 ${y} V${y + 12} H104`} className="f-linha" />
      <text x="28" y={y + 17} className="f-texto f-texto-forte">{nome}</text>
    </g>
  );
}

export function FiguraHortifruti({ idioma }: { idioma: Idioma }) {
  const r = rotulos[idioma];

  return (
    <svg viewBox="0 0 480 300" className="block h-auto w-full">
      <text x="20" y="20" className="f-texto">{r.extratos}</text>
      <Documento y={30} nome="sicoob.pdf" />
      <Documento y={166} nome="bb.pdf" />
      {[62, 76, 90, 104, 118].map((y) => (
        <LinhaSicoob key={y} y={y} />
      ))}
      {[198, 212, 226, 240, 254].map((y) => (
        <LinhaBB key={y} y={y} />
      ))}

      {/* caminhos até o parser e dele até o livro */}
      {origem.map((y) => (
        <path key={`o${y}`} d={`M104 ${y} C142 ${y} 150 150 182 150`} className="f-linha" strokeOpacity="0.3" />
      ))}
      {destino.map((y) => (
        <path key={`d${y}`} d={`M262 150 C292 150 298 ${y} 322 ${y}`} className="f-linha" strokeOpacity="0.3" />
      ))}

      {/* parser: funil que estreita para a direita */}
      <path d="M182 112 L262 126 V174 L182 188 Z" className="f-caixa" />
      <text x="220" y="154" textAnchor="middle" className="f-texto f-texto-forte">{r.parser}</text>
      <text x="222" y="208" textAnchor="middle" className="f-texto">{r.formato}</text>
      <Piscar T={T} em={origem.map((_, i) => [momento(i).entra[1], momento(i).entra[1] + 0.18] as [number, number])} fade={0.05}>
        <path d="M182 112 L262 126 V174 L182 188 Z" fill="var(--signal-soft)" stroke="var(--signal)" strokeWidth="1.25" />
      </Piscar>

      {/* livro de lançamentos */}
      <rect x="318" y="40" width="146" height="214" rx="4" className="f-caixa" />
      <text x="328" y="58" className="f-texto f-texto-forte">{r.lancamentos}</text>
      <line x1="318" y1="68" x2="464" y2="68" className="f-linha" strokeOpacity="0.5" />
      {destino.map((y, i) => {
        const pouso = momento(i).sai[1];
        return (
          <g key={y}>
            <line x1="326" y1={y + 14} x2="456" y2={y + 14} className="f-linha" strokeOpacity="0.15" />
            <Piscar T={T} em={[[pouso, 8.6]]}>
              <LinhaUnica y={y} />
            </Piscar>
            <Piscar T={T} em={[[6.0 + i * 0.25, 8.6]]}>
              <text x="448" y={y + 3.5} textAnchor="middle" className="f-texto f-texto-sinal">✓</text>
            </Piscar>
          </g>
        );
      })}
      <Piscar T={T} em={[[7.6, 8.6]]}>
        <text x="318" y="276" className="f-texto f-texto-sinal">{r.conciliado}</text>
      </Piscar>

      {/* as linhas viajando */}
      {origem.map((y, i) => {
        const { entra, sai } = momento(i);
        const sicoob = i % 2 === 0;
        return (
          <g key={`v${i}`}>
            <Viagem T={T} d={`M104 ${y} C142 ${y} 150 150 182 150`} de={entra[0]} ate={entra[1]}>
              {sicoob ? (
                <g fill="var(--foreground)">
                  <rect x="-16" y="-2" width="8" height="4" rx="1" />
                  <rect x="-5" y="-2" width="12" height="4" rx="1" />
                  <rect x="10" y="-2" width="6" height="4" rx="1" />
                </g>
              ) : (
                <g>
                  <rect x="-16" y="-2" width="7" height="4" rx="1" fill="var(--foreground)" />
                  <line x1="-5" y1="0" x2="16" y2="0" stroke="var(--foreground)" strokeWidth="1.5" strokeDasharray="1.5 2.5" />
                </g>
              )}
            </Viagem>
            <Viagem T={T} d={`M262 150 C292 150 298 ${destino[i]} 322 ${destino[i]}`} de={sai[0]} ate={sai[1]}>
              <g fill="var(--signal)">
                <rect x="-16" y="-2.5" width="6" height="5" rx="1" />
                <rect x="-7" y="-2.5" width="14" height="5" rx="1" />
                <rect x="10" y="-2.5" width="7" height="5" rx="1" />
              </g>
            </Viagem>
          </g>
        );
      })}
    </svg>
  );
}
