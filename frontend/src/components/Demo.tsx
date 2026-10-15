import { useRef, useState, type FormEvent } from "react";
import { WHATSAPP_DEFAULT_MSG, WHATSAPP_DISPLAY, whatsappLink } from "../config";
import { saveLead } from "../lib/leads";
import { WhatsAppGlyph } from "./Brand";

const TIPOS = ["Salón", "Barbería", "Spa", "Uñas", "Estética", "Centro wellness", "Otro"];
const SEDES = ["1", "2 a 3", "4 a 10", "Más de 10"];

type Form = { nombre: string; negocio: string; tipo: string; sedes: string; whatsapp: string };
const REQUIRED: (keyof Form)[] = ["nombre", "negocio", "whatsapp"];

export function Demo() {
  const [form, setForm] = useState<Form>({ nombre: "", negocio: "", tipo: TIPOS[0], sedes: SEDES[0], whatsapp: "" });
  const [invalid, setInvalid] = useState<keyof Form | null>(null);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const trap = useRef<HTMLInputElement>(null);

  const set = (k: keyof Form) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (invalid === k) setInvalid(null);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const miss = REQUIRED.find((k) => !form[k].trim());
    if (miss) {
      setInvalid(miss);
      formRef.current?.querySelector<HTMLInputElement>(`[name="${miss}"]`)?.focus();
      return;
    }
    const msg = [
      "Hola, quiero agendar una demo de bfull.",
      `Nombre: ${form.nombre.trim()}`,
      `Negocio: ${form.negocio.trim()}`,
      `Tipo de negocio: ${form.tipo}`,
      `Número de sedes: ${form.sedes}`,
      `WhatsApp: ${form.whatsapp.trim()}`,
    ].join("\n");
    // WhatsApp se abre primero (dentro del clic) para que el navegador no lo bloquee
    window.open(whatsappLink(msg), "_blank", "noopener");
    saveLead({
      nombre: form.nombre.trim(),
      negocio: form.negocio.trim(),
      tipo: form.tipo,
      sedes: form.sedes,
      whatsapp: form.whatsapp.trim(),
      origen: window.location.href,
      website: trap.current?.value || undefined,
    });
    setSent(true);
  };

  const inv = (k: keyof Form) =>
    invalid === k ? { "aria-invalid": true as const, style: { borderColor: "#3D0A78" } } : {};

  return (
    <section className="demo" id="demo" aria-labelledby="demo-title">
      <div className="wrap demo-grid">
        <div>
          <p className="eyebrow">Demo</p>
          <h2 className="h-l" id="demo-title">
            Hagamos crecer tu negocio.
          </h2>
          <p className="lede">
            En 30 minutos te mostramos bfull con un negocio real y calculamos contigo la oportunidad del tuyo.
          </p>
          <a className="wa-direct" href={whatsappLink(WHATSAPP_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer">
            <WhatsAppGlyph />
            Escríbenos por WhatsApp · {WHATSAPP_DISPLAY}
          </a>
        </div>
        <form ref={formRef} noValidate onSubmit={onSubmit}>
          <label>
            Tu nombre
            <input name="nombre" required autoComplete="name" value={form.nombre} onChange={set("nombre")} {...inv("nombre")} />
          </label>
          <label>
            Nombre del negocio
            <input
              name="negocio"
              required
              autoComplete="organization"
              value={form.negocio}
              onChange={set("negocio")}
              {...inv("negocio")}
            />
          </label>
          <label>
            Tipo de negocio
            <select name="tipo" value={form.tipo} onChange={set("tipo")}>
              {TIPOS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label>
            Número de sedes
            <select name="sedes" value={form.sedes} onChange={set("sedes")}>
              {SEDES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            WhatsApp
            <input
              name="whatsapp"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              value={form.whatsapp}
              onChange={set("whatsapp")}
              {...inv("whatsapp")}
            />
          </label>
          {/* campo trampa para bots: invisible para personas */}
          <input
            ref={trap}
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
          />
          <button className="btn btn-ink" type="submit">
            {sent ? "Abrir WhatsApp de nuevo" : "Agendar mi demo"}
          </button>
          <div className="form-ok" role="status" style={{ display: sent ? "block" : undefined }}>
            Listo. Abrimos WhatsApp con tus datos: solo envía el mensaje y agendamos tu demo.
          </div>
        </form>
      </div>
    </section>
  );
}
