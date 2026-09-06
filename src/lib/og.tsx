import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/*
 * Layout único para todas as imagens OG, na paleta neutra: preto quente,
 * texto osso e três pontos monocromáticos como assinatura — do osso cheio
 * ao esfumaçado. Hex porque Satori (renderer do next/og) não lê oklch.
 */
export function ogImage(titulo: string, subtitulo: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#0b0b0a",
          color: "#eceae5",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          {/* osso cheio, cinza médio, cinza baixo */}
          {["#eceae5", "#8d8b84", "#3d3c38"].map((cor) => (
            <div
              key={cor}
              style={{
                width: 28,
                height: 28,
                borderRadius: 9999,
                backgroundColor: cor,
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
            }}
          >
            {titulo}
          </div>
          <div style={{ fontSize: 30, color: "#8d8b84", lineHeight: 1.4 }}>
            {subtitulo}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
