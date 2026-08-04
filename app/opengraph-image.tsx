import { perfil } from "@/content/perfil";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = `${perfil.nome} — ${perfil.posicionamento}`;

export default function Image() {
  return ogImage(perfil.nome, perfil.posicionamento);
}
