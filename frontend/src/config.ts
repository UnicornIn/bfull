/** Datos de contacto del negocio. */
export const WHATSAPP_NUMBER = "573023751183";
export const WHATSAPP_DISPLAY = "+57 302 375 1183";

export const whatsappLink = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}` + (text ? `?text=${encodeURIComponent(text)}` : "");

export const WHATSAPP_DEFAULT_MSG = "Hola, quiero conocer bfull para mi negocio.";
