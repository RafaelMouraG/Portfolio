import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/*
 * Layout único para todas as imagens OG, na paleta do site: fundo névoa,
 * tinta quase preta e o ponto laranja como assinatura, o mesmo do status.
 * Hex porque Satori (renderer do next/og) não lê variáveis CSS.
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
          backgroundColor: "#eeefec",
          color: "#17181a",
        }}
      >
        <div
          style={{ width: 22, height: 22, borderRadius: 9999, backgroundColor: "#d9481e" }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
            }}
          >
            {titulo}
          </div>
          <div style={{ fontSize: 30, color: "#5b5e63", lineHeight: 1.4 }}>
            {subtitulo}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
