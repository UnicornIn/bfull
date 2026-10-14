import { useEffect, useState, type CSSProperties } from "react";
import { fmtCOP, fmtN } from "../../lib/utils";
import { CountUp } from "../CountUp";

/** Cada panel recibe `run`: 0 si está inactivo, o un contador que cambia en cada activación. */
export type PanelProps = { run: number };

export const pct = (n: number) => fmtN(n) + "%";

export function Kpi(props: {
  l: string;
  to: number;
  s: string;
  run: number;
  fmt?: (n: number) => string;
  sel?: boolean;
  style?: CSSProperties;
}) {
  const { l, to, s, run, fmt = fmtCOP, sel, style } = props;
  return (
    <div className={"kpi" + (sel ? " sel" : "")}>
      <div className="l">{l}</div>
      <div className="v num" style={style}>
        <CountUp to={to} fmt={fmt} run={run} />
      </div>
      <div className="s">{s}</div>
    </div>
  );
}

export function Hbar({ w, run }: { w: number; run: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!run) return;
    setWidth(0);
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setWidth(w));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [run, w]);
  return (
    <div className="hbar">
      <i style={{ width: width + "%" }} />
    </div>
  );
}

/** Fila con etiqueta + valor y barra horizontal debajo. */
export function BarRow({ label, value, w, run, neg }: { label: string; value: string; w: number; run: number; neg?: boolean }) {
  return (
    <>
      <div className="row" style={{ border: 0, paddingBottom: 0 }}>
        <span>{label}</span>
        <span className={"r num" + (neg ? " neg" : "")}>{value}</span>
      </div>
      <Hbar w={w} run={run} />
    </>
  );
}
