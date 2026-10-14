const KINDS = [
  "Salones",
  "Barberías",
  "Spas",
  "Uñas",
  "Cejas y pestañas",
  "Estética",
  "Centros wellness",
  "Especialistas en rizos",
  "Cadenas multisede",
];

export function Who() {
  return (
    <section className="who" aria-labelledby="who-title">
      <div className="wrap">
        <h2 className="h-l rv" id="who-title" style={{ maxWidth: "20ch" }}>
          Para cualquier negocio que viva de la belleza y el bienestar.
        </h2>
      </div>
      <div className="marquee" aria-hidden="true">
        {[...KINDS, ...KINDS].map((k, i) => (
          <span key={i}>{k}</span>
        ))}
      </div>
      <p className="wrap" style={{ position: "absolute", left: -9999 }}>
        Salones, barberías, spas, uñas, cejas y pestañas, estética, centros wellness, especialistas en rizos y cadenas
        multisede.
      </p>
    </section>
  );
}

const STEPS: [string, string][] = [
  ["Diagnóstico de tu base", "Te mostramos cuántos clientes tienes activos, en riesgo y perdidos, y cuánto vale recuperarlos."],
  ["Migramos tu operación", "Agenda, clientes, servicios, productos y profesionales. Tu equipo sigue trabajando."],
  ["Conectamos WhatsApp y el motor", "El agente agenda y confirma abonos. El motor de diagnóstico empieza a medir cada servicio."],
  ["Revisamos los números cada mes", "Resultados, ventas, retención y evolución de tus clientes, para decidir el mes siguiente."],
];

export function How() {
  return (
    <section className="how" id="como" aria-labelledby="how-title">
      <div className="wrap">
        <p className="eyebrow rv">Cómo empezamos</p>
        <h2 className="h-l rv d1" id="how-title">
          En marcha, sin empezar de cero.
        </h2>
        <ol>
          {STEPS.map(([h, p], i) => (
            <li key={h} className={"rv" + (i ? ` d${i}` : "")}>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
