import { WHATSAPP_DEFAULT_MSG, WHATSAPP_DISPLAY, whatsappLink } from "../config";
import { Logo, WhatsAppGlyph } from "./Brand";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <Logo label="bfull" />
        <div className="foot-r">
          <span>Crecimiento y eficiencia para negocios de belleza y wellness · Unicornio Industries, Medellín</span>
          <a href={whatsappLink(WHATSAPP_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer">
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={whatsappLink(WHATSAPP_DEFAULT_MSG)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsAppGlyph />
      <span>Escríbenos</span>
    </a>
  );
}
