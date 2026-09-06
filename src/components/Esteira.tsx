/*
 * Faixa de tecnologias que atravessa a página abaixo do cabeçalho. A lista é
 * duplicada no DOM e a animação desloca exatamente metade da largura.
 *
 * Para o laço fechar sem salto, cada item precisa ser uma unidade de largura
 * fixa: o espaçamento vai TODO dentro do item (o gap antes do ✦ e o padding
 * depois dele), e o contêiner não tem gap nenhum. Assim a faixa é perfeitamente
 * periódica e -50% cai em cima da emenda. Espaçamento no contêiner deixaria
 * meia-lacuna de resíduo e a faixa daria um tranco a cada volta.
 *
 * A cópia é aria-hidden (o leitor de tela ouve a lista uma vez) e some sob
 * prefers-reduced-motion, quando a faixa vira uma lista estática centrada.
 */
function Linha({ itens }: { itens: string[] }) {
  return (
    <div className="flex">
      {itens.map((item) => (
        <span key={item} className="flex items-center gap-x-[34px] pr-[34px]">
          {item}
          <span aria-hidden className="text-dim">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export function Esteira({ itens }: { itens: string[] }) {
  return (
    <div className="esteira-mascara overflow-hidden border-y border-border-soft py-3">
      <div className="esteira flex font-mono text-xs tracking-[0.05em] whitespace-nowrap text-faint">
        <Linha itens={itens} />
        <div aria-hidden className="esteira-copia flex">
          <Linha itens={itens} />
        </div>
      </div>
    </div>
  );
}
