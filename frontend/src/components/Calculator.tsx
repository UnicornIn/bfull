import { useRef, useState } from "react";
import { useCountUp } from "../hooks/useCountUp";
import { useInView } from "../hooks/useInView";
import { fmtCOP, fmtN } from "../lib/utils";

type Field = { id: "base" | "lost" | "ticket" | "rec"; label: string; min: number; max: number; step: number; fmt: (n: number) => string };

const FIELDS: Field[] = [
  { id: "base", label: "Clientes en tu base", min: 200, max: 20000, step: 100, fmt: fmtN },
  { id: "lost", label: "Que no han vuelto en 90 días", min: 10, max: 90, step: 1, fmt: (n) => n + "%" },
  { id: "ticket", label: "Ticket promedio", min: 20000, max: 500000, step: 5000, fmt: fmtCOP },
  { id: "rec", label: "Clientes que logras reactivar", min: 1, max: 25, step: 1, fmt: (n) => n + "%" },
];

const INITIAL = { base: 2000, lost: 60, ticket: 150000, rec: 8 };

const compute = (v: typeof INITIAL) => {
  const lost = (v.base * v.lost) / 100;
  const back = Math.round((lost * v.rec) / 100);
  const first = back * v.ticket;
  return { lost, back, first, year: first * 4 };
};

const INITIAL_YEAR = compute(INITIAL).year;

export function Calculator() {
  const [vals, setVals] = useState(INITIAL);
  const touched = useRef(false);
  const [yearRef, seen] = useInView<HTMLDivElement>(0.5);
  const animated = useCountUp(INITIAL_YEAR, seen, 1400);
  const r = compute(vals);
  const yearText = touched.current || !seen ? fmtCOP(r.year) : fmtCOP(animated);

  return (
    <section className="calc" id="calculadora" aria-labelledby="calc-title">
      <div className="wrap calc-grid">
        <div>
          <p className="eyebrow rv">Calculadora</p>
          <h2 className="h-l rv d1" id="calc-title">
            ¿Cuánto dinero está dormido en tu base?
          </h2>
          <p className="lede rv d2" style={{ marginBottom: 44 }}>
            Mueve los valores con los números de tu negocio. Si no los tienes a la mano, ese es el primer problema que
            resolvemos.
          </p>
          {FIELDS.map((f) => (
            <div className="field" key={f.id}>
              <div className="field-top">
                <label htmlFor={"c-" + f.id}>{f.label}</label>
                <output className="num">{f.fmt(vals[f.id])}</output>
              </div>
              <input
                type="range"
                id={"c-" + f.id}
                min={f.min}
                max={f.max}
                step={f.step}
                value={vals[f.id]}
                onChange={(e) => {
                  touched.current = true;
                  setVals((v) => ({ ...v, [f.id]: Number(e.target.value) }));
                }}
              />
            </div>
          ))}
        </div>
        <div className="result rv d1" aria-live="polite">
          <small>Ventas que puedes recuperar en un año</small>
          <div className="big num" ref={yearRef}>
            {yearText}
          </div>
          <ul>
            <li>
              <span>Clientes perdidos hoy</span>
              <b className="num">{fmtN(r.lost)}</b>
            </li>
            <li>
              <span>Clientes que vuelven</span>
              <b className="num">{fmtN(r.back)}</b>
            </li>
            <li>
              <span>Ventas de su primera visita de regreso</span>
              <b className="num">{fmtCOP(r.first)}</b>
            </li>
            <li>
              <span>Si vuelven 4 veces al año</span>
              <b className="num">{fmtCOP(r.year)}</b>
            </li>
          </ul>
          <p className="fine">Estimación simple para dimensionar la oportunidad. No incluye clientes nuevos ni venta de productos.</p>
          <a className="btn btn-white" href="#demo">
            Quiero recuperar esas ventas
          </a>
        </div>
      </div>
    </section>
  );
}
