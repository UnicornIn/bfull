/** URL del Apps Script que guarda las solicitudes en Google Sheets (ver README). */
const LEADS_URL = import.meta.env.VITE_LEADS_URL;

export type Lead = {
  nombre: string;
  negocio: string;
  tipo: string;
  sedes: string;
  whatsapp: string;
  origen: string;
  website?: string;
};

/**
 * Envía la solicitud al Sheet sin bloquear al usuario. Apps Script no responde
 * con CORS, así que se usa `no-cors` y texto plano (sin preflight).
 */
export function saveLead(lead: Lead) {
  if (!LEADS_URL) {
    if (import.meta.env.DEV) console.warn("VITE_LEADS_URL no está configurada: la solicitud no se guardó.");
    return;
  }
  fetch(LEADS_URL, {
    method: "POST",
    mode: "no-cors",
    keepalive: true,
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(lead),
  }).catch(() => {});
}
