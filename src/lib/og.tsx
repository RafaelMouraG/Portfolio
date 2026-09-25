import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/*
 * Layout único para todas as imagens OG, na paleta do v4: preto quente, texto
 * osso e a marca do topo do site (quadrado com o ponto vermelho do sinal).
 * Hex porque Satori (renderer do next/og) não lê oklch.
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
          backgroundColor: "#0a0a09",
          color: "#ecebe6",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              border: "2px solid rgba(236, 235, 230, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 9999, backgroundColor: "#ff5a36" }} />
          </div>
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
          <div style={{ fontSize: 30, color: "#9b9992", lineHeight: 1.4 }}>
            {subtitulo}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
