import { perfilEn } from "@/content/perfil.en";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = `${perfilEn.nome} — ${perfilEn.posicionamento}`;

export default function Image() {
  return ogImage(perfilEn.nome, perfilEn.posicionamento);
}
