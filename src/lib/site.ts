// URL canônica do site: definida por env em produção, com fallback para a
// URL de produção da Vercel e, por fim, localhost em desenvolvimento.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
