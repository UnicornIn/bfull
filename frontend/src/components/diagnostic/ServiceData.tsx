import { useEffect, useState } from "react";
import { useInView } from "../../hooks/useInView";
import { reduceMotion } from "../../lib/utils";
import { CATS, type CatKey } from "./data";

function Meter({ w, k, seen }: { w: number; k: number; seen: boolean }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const t = setTimeout(() => setWidth(w), reduceMotion ? 0 : k * 120);
    return () => clearTimeout(t);
  }, [seen, w, k]);
  return (
    <div className="meter">
      <i style={{ width: width + "%" }} />
    </div>
  );
}

export function ServiceData({ cat }: { cat: CatKey }) {
  const [tableRef, seen] = useInView<HTMLTableElement>(0.3);
  return (
    <section className="svc-sec" aria-labelledby="svc-title">
      <div className="wrap">
        <p className="eyebrow rv">Data clara de cada servicio</p>
        <h2 className="h-l rv d1" id="svc-title" style={{ maxWidth: "20ch" }}>
          Qué problema resuelve cada servicio. Y en cuántas visitas.
        </h2>
        <p className="lede rv d2" style={{ maxWidth: "52ch" }}>
          El motor suma los diagnósticos de todas tus clientes. Sabes qué servicios dan resultados, cuáles recomendar y
          cómo venderlos con evidencia.
        </p>
        <div className="tscroll rv">
          <table className="svc" ref={tableRef}>
            <thead>
              <tr>
                <th>Servicio</th>
                <th>Problema que resuelve</th>
                <th>Clientes que mejoran</th>
                <th>Mejora promedio</th>
                <th>Visitas para ver resultado</th>
              </tr>
            </thead>
            {/* key por categoría: las barras se reinician al cambiar */}
            <tbody key={cat}>
              {CATS[cat].svc.map(([name, problem, pctBetter, pts, visits], k) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{problem}</td>
                  <td>
                    <span className="pct num">{pctBetter}%</span>
                    <Meter w={pctBetter} k={k} seen={seen} />
                  </td>
                  <td className="num">
                    <b>+{pts}</b> puntos
                  </td>
                  <td className="num">
                    {visits} {visits === 1 ? "visita" : "visitas"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="svc-note">
          Datos de ejemplo para ilustrar el motor. Con tu operación, se calculan con los diagnósticos reales de tus
          clientes.
        </p>
      </div>
    </section>
  );
}
