import { Fragment, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";
import { useScrollFrame } from "../hooks/useScrollFrame";
import { clamp, ease, fmtCOP, reduceMotion, short } from "../lib/utils";
import { CountUp } from "./CountUp";

type WfItem = { k: "in" | "out" | "res"; l: string; v: number; tip: string; hl?: boolean };

const WF: WfItem[] = [
  { k: "in", l: "Ingresos", v: 67191371, tip: "Entraron $67,2 M: $45,1 M en servicios, $17,3 M en productos y $2,5 M manuales." },
  { k: "out", hl: true, l: "Otros", v: 22445268, tip: 'El 46% de los gastos estaba en "Otros". Plata que nadie sabía en qué se iba. Es lo primero que ordenamos contigo.' },
  { k: "out", l: "Nómina", v: 12922840, tip: "La nómina administrativa es el 26% de los gastos. Las comisiones se suman solas desde la agenda." },
  { k: "out", l: "Caja menor", v: 7363300, tip: "$7,4 M en gastos del día a día que recepción registra en caja menor." },
  { k: "out", l: "Arriendo", v: 2311520, tip: "El arriendo pesa el 4,7% de los gastos. Sabes cuánto vender para cubrirlo." },
  { k: "out", l: "Marketing", v: 2147171, tip: "$2,1 M en marketing. Cruzado con clientes nuevos, sabes cuánto cuesta traer a cada uno." },
  { k: "out", l: "Proveedores", v: 1593616, tip: "Compras a proveedores conectadas con el inventario de cada sede." },
  { k: "out", l: "Seguros", v: 111053, tip: "Hasta los gastos pequeños quedan registrados y clasificados." },
  { k: "res", l: "Utilidad", v: 18296603, tip: "Te quedan $18,3 M, un margen del 27%. Con ese número se toman las decisiones." },
];

// alto y base (en %) de cada barra de la cascada
const WF_MAX = WF[0].v;
const WF_BARS = (() => {
  let running = WF_MAX;
  return WF.map((d) => {
    const h = (d.v / WF_MAX) * 100;
    let b = 0;
    if (d.k === "out") {
      running -= d.v;
      b = (running / WF_MAX) * 100;
    }
    return { ...d, h, b };
  });
})();

const QA: { q: string; big: string; num?: boolean; a: string }[] = [
  { q: "¿Cuánto gané de verdad este mes?", big: "$18.296.603", num: true, a: "Después de nómina, arriendo, proveedores, marketing y caja menor. Margen del 27%." },
  { q: "¿Facturé lo mismo que cobré?", big: "$9,9 M", num: true, a: "de diferencia entre lo facturado ($62,5 M) y lo que entró a caja ($52,6 M). Sabes qué falta por cobrar." },
  { q: "¿En qué se me va la plata?", big: "Nómina: 26%", a: "Cada egreso clasificado por categoría y por caja, con su peso sobre el total." },
  { q: "¿Cuánto le pago a cada profesional?", big: "Automático", a: "Las comisiones salen solas del porcentaje de cada profesional y cada cita atendida." },
  { q: "¿Cuadra la caja de hoy?", big: "Cierre de caja", a: "Recepción registra la caja menor, el administrador ve los traslados y el cierre cuadra." },
];

export function Finance() {
  const zoom = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState(WF[1].tip);
  const [open, setOpen] = useState(0);
  const [wfRef, wfOn] = useInView<HTMLDivElement>(0.4);

  // la cifra gigante se asienta con el scroll
  useScrollFrame(() => {
    if (reduceMotion || !zoom.current) return;
    const vh = window.innerHeight;
    const r = zoom.current.getBoundingClientRect();
    const e = ease(clamp((vh - r.top) / (vh * 0.75), 0, 1));
    zoom.current.style.transform = `scale(${(1.7 - 0.7 * e).toFixed(4)})`;
    zoom.current.style.opacity = (0.08 + 0.92 * e).toFixed(3);
  });

  return (
    <section className="fin" id="finanzas" aria-labelledby="fin-title">
      <div className="wrap">
        <p className="eyebrow center rv" style={{ textAlign: "center" }}>
          Finanzas
        </p>
        <h2 className="h-l center rv d1" id="fin-title" style={{ textAlign: "center", maxWidth: "18ch" }}>
          Vender mucho no es lo mismo que ganar bien.
        </h2>
        <div className="zoom-num num" ref={zoom} aria-label="18,3 millones de utilidad">
          $18,3 M
        </div>
        <p className="zoom-cap">
          Lo que realmente quedó de $67,2 M de ingresos en un mes. bfull lo muestra sin esperar al contador.
        </p>

        <div className="fin-grid">
          <div className="wf-card rv">
            <div className="wf-top">
              <div>
                <h3 className="h-m" style={{ fontSize: 20, margin: 0 }}>
                  De lo que entra a lo que te queda
                </h3>
                <p>Estado de resultados real de un mes · pasa el cursor o toca cada barra</p>
              </div>
              <div className="wf-total">
                <b className="num">
                  <CountUp to={18296603} fmt={fmtCOP} run={wfOn} dur={1600} />
                </b>
                <span>utilidad · margen 27%</span>
              </div>
            </div>
            <div className="wf-scroll">
              <div
                className={"wf" + (wfOn ? " on" : "")}
                ref={wfRef}
                role="img"
                aria-label="Cascada: ingresos 67,2 millones, gastos 48,9 millones, utilidad 18,3 millones"
              >
                {WF_BARS.map((d, i) => {
                  const show = () => setTip(d.tip);
                  return (
                    <div
                      key={d.l}
                      className={`wf-col ${d.k}` + (d.hl ? " hl" : "")}
                      tabIndex={0}
                      aria-label={`${d.l} ${short(d.v)}`}
                      onMouseEnter={show}
                      onFocus={show}
                      onClick={show}
                    >
                      <div
                        className="bar"
                        style={{
                          bottom: d.b + "%",
                          transitionDelay: i * 90 + "ms",
                          height: wfOn ? Math.max(d.h, 0.8) + "%" : 0,
                        }}
                      />
                      <div className="val num" style={{ bottom: `calc(${d.b + d.h}% + 6px)` }}>
                        {(d.k === "out" ? "−" : "") + short(d.v)}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="wf-labels">
                {WF.map((d) => (
                  <span key={d.l}>{d.k === "out" ? d.l : <b>{d.l}</b>}</span>
                ))}
              </div>
            </div>
            <div className="wf-tip" aria-live="polite">
              {tip}
            </div>
          </div>
          <div className="qa rv d1">
            <h3 className="h-m" style={{ fontSize: 20 }}>
              Preguntas que respondes en 10 segundos
            </h3>
            {QA.map((item, i) => (
              <Fragment key={item.q}>
                <button className="qbtn" aria-expanded={open === i} aria-controls={`q${i + 1}`} onClick={() => setOpen(i)}>
                  {item.q}
                </button>
                <div className={"qans" + (open === i ? " open" : "")} id={`q${i + 1}`}>
                  <b className={"big" + (item.num ? " num" : "")}>{item.big}</b>
                  {item.a}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
