import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Layout único para todas as imagens OG: fundo escuro neutro, os três
// accents do filtro como assinatura visual, título e uma linha de apoio.
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
          backgroundColor: "#0c0c10",
          color: "#ececf1",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          {["#facc15", "#60a5fa", "#34d399"].map((cor) => (
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
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            {titulo}
          </div>
          <div style={{ fontSize: 30, color: "#a3a3ad", lineHeight: 1.4 }}>
            {subtitulo}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
