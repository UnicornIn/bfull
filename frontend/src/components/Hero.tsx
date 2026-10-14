import { useEffect, useRef, useState } from "react";
import { useScrollFrame } from "../hooks/useScrollFrame";
import { clamp, ease, fmtCOP, fmtN, reduceMotion } from "../lib/utils";
import { AppBar } from "./AppBar";
import { CountUp } from "./CountUp";

const SALES = [52, 61, 58, 70, 88, 100, 34, 55, 64, 62, 76, 92, 97, 38];
const DAYS = ["L", "M", "M", "J", "V", "S", "D", "L", "M", "M", "J", "V", "S", "D"];
const RANKING: [string, string, string][] = [
  ["BG", "Beatriz G.", "$8,4 M"],
  ["SH", "Sergio H.", "$7,1 M"],
  ["LG", "Laura G.", "$6,6 M"],
  ["AS", "Anny S.", "$5,9 M"],
  ["CC", "Camila C.", "$4,8 M"],
];

export function Hero() {
  const device = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), reduceMotion ? 0 : 900);
    return () => clearTimeout(t);
  }, []);

  // el dispositivo se endereza y crece con el scroll
  useScrollFrame(() => {
    if (reduceMotion || !device.current) return;
    const e = ease(clamp(window.scrollY / (window.innerHeight * 0.7), 0, 1));
    device.current.style.transform = `rotateX(${(22 * (1 - e)).toFixed(2)}deg) scale(${(0.9 + 0.1 * e).toFixed(4)})`;
  });

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <h1 className="h-xl" id="hero-title">
          <span className="ln">
            <span>
              <span className="strike">No vendemos software.</span>
            </span>
          </span>
          <span className="ln">
            <span>Hacemos crecer</span>
          </span>
          <span className="ln">
            <span>negocios de belleza.</span>
          </span>
        </h1>
        <p className="lede">
          Operación más eficiente, finanzas claras, clientes que vuelven, resultados que se ven y más ventas. Para pasar
          de un negocio a un gran negocio.
        </p>
        <div className="hero-ctas">
          <a className="btn btn-ink" href="#demo">
            Agendar una demo
          </a>
          <a className="btn btn-line" href="#calculadora">
            Calcula lo que estás dejando de ganar
          </a>
        </div>
      </div>
      <div className="device-stage">
        <div className="device" ref={device}>
          <div className="screen">
            <div className="app">
              <AppBar tabs={["Dashboard", "Agenda", "Clientes", "Diagnóstico", "Finanzas", "Callcenter"]} />
              <div className="app-body">
                <div className="app-h">
                  <div>
                    <h4>Dashboard</h4>
                    <small>Mes actual · todas las sedes</small>
                  </div>
                  <span className="sede">3 SEDES</span>
                </div>
                <div className="kpis">
                  <div className="kpi sel">
                    <div className="l">Ventas totales</div>
                    <div className="v num">
                      <CountUp to={62502370} fmt={fmtCOP} run={started} dur={1600} />
                    </div>
                    <div className="s">237 servicios · 156 productos</div>
                  </div>
                  <div className="kpi">
                    <div className="l">Ticket promedio</div>
                    <div className="v num">
                      <CountUp to={186019} fmt={fmtCOP} run={started} dur={1600} />
                    </div>
                    <div className="s">por visita</div>
                  </div>
                  <div className="kpi">
                    <div className="l">Clientes nuevos</div>
                    <div className="v num">
                      <CountUp to={934} fmt={fmtN} run={started} dur={1600} />
                    </div>
                    <div className="s">este mes</div>
                  </div>
                  <div className="kpi">
                    <div className="l">Utilidad</div>
                    <div className="v num" style={{ color: "#3D0A78" }}>
                      <CountUp to={18296603} fmt={fmtCOP} run={started} dur={1600} />
                    </div>
                    <div className="s">margen 27%</div>
                  </div>
                </div>
                <div className="dash-grid">
                  <div className="box">
                    <h5>
                      Ventas por día <span>últimos 14 días</span>
                    </h5>
                    <div className="bars">
                      {SALES.map((v, i) => (
                        <div
                          key={i}
                          className={i >= 11 && i <= 12 ? "hi" : undefined}
                          style={{
                            height: started ? v + "%" : 0,
                            transitionDelay: reduceMotion ? undefined : i * 45 + "ms",
                          }}
                        />
                      ))}
                    </div>
                    <div className="bars-x">
                      {DAYS.map((d, i) => (
                        <span key={i}>{d}</span>
                      ))}
                    </div>
                  </div>
                  <div className="box">
                    <h5>
                      Ranking por ingreso <span>profesionales</span>
                    </h5>
                    {RANKING.map(([ini, name, val]) => (
                      <div className="rank" key={ini}>
                        <i>{ini}</i>
                        <span>{name}</span>
                        <b className="num">{val}</b>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
