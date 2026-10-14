import { useEffect, useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";
import { useScrollFrame } from "../../hooks/useScrollFrame";
import { clamp, ease, isMobile, lerp, reduceMotion } from "../../lib/utils";
import { CAT_KEYS, CATS, indexAt, valAt, type CatKey } from "./data";

const C = 2 * Math.PI * 52;
const W = 520;
const H = 210;

type Props = { cat: CatKey; onCat: (c: CatKey) => void };

export function Motor({ cat, onCat }: Props) {
  const [p, setP] = useState(0);
  const scrubbing = useRef(false);
  const scrubTimer = useRef(0);
  const pinWrap = useRef<HTMLDivElement | null>(null);
  const hint = useRef<HTMLDivElement>(null);
  const [viewRef, pinSeen] = useInView<HTMLDivElement>(0.3);

  // escritorio: la evolución avanza con el scroll mientras la sección está fijada
  useScrollFrame(() => {
    const wrap = pinWrap.current;
    if (!wrap || isMobile() || reduceMotion || scrubbing.current) return;
    const vh = window.innerHeight;
    const r = wrap.getBoundingClientRect();
    const ep = clamp((60 - r.top) / (r.height - (vh - 60)), 0, 1);
    if (r.top < vh && r.bottom > 0) setP(3 * ep);
    if (hint.current) hint.current.style.opacity = ep > 0.85 ? "0" : "1";
  });

  // móvil o movimiento reducido: reproduce la evolución al entrar
  useEffect(() => {
    if (!pinSeen || !(isMobile() || reduceMotion)) return;
    if (reduceMotion) {
      setP(3);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const play = (now: number) => {
      const q = Math.min(1, (now - t0) / 3600);
      if (!scrubbing.current) setP(3 * ease(q));
      if (q < 1) raf = requestAnimationFrame(play);
    };
    raf = requestAnimationFrame(play);
    return () => cancelAnimationFrame(raf);
  }, [pinSeen]);

  const onScrub = (v: number) => {
    scrubbing.current = true;
    setP(v);
    clearTimeout(scrubTimer.current);
    scrubTimer.current = window.setTimeout(() => (scrubbing.current = false), 400);
  };

  const d = CATS[cat];
  const t = p / 3;
  const idx = indexAt(d, t);
  const cur = Math.min(3, Math.round(p));

  // curva de evolución
  const pts = [0, 1, 2, 3].map((v) => [30 + (v * (W - 60)) / 3, H - 10 - indexAt(d, v / 3) * 1.9]);
  const seg = Math.min(2, Math.floor(p));
  const f = p - seg;
  let path = `M${pts[0][0]} ${pts[0][1]}`;
  for (let s = 0; s < seg; s++) path += ` L${pts[s + 1][0]} ${pts[s + 1][1]}`;
  const ex = lerp(pts[seg][0], pts[seg + 1][0], p >= 3 ? 1 : f);
  const ey = lerp(pts[seg][1], pts[seg + 1][1], p >= 3 ? 1 : f);
  path += ` L${ex.toFixed(1)} ${ey.toFixed(1)}`;
  const area = `${path} L${ex.toFixed(1)} ${H - 10} L${pts[0][0]} ${H - 10} Z`;

  return (
    <section className="dark" id="motor" aria-labelledby="motor-title">
      <div className="wrap motor-intro">
        <p className="eyebrow rv">Nuevo · motor inteligente de diagnóstico</p>
        <h2 className="h-xl rv d1" id="motor-title">
          Resultados que se ven. Y se miden.
        </h2>
        <p className="lede rv d2">
          Cada servicio empieza con un diagnóstico, cada visita mide la evolución y cada cliente recibe su progreso real.
          Tu equipo sabe qué hacer. Tu cliente ve por qué volver.
        </p>
        <div className="cats rv d3" role="group" aria-label="Tipo de servicio">
          {CAT_KEYS.map((k) => (
            <button key={k} aria-pressed={k === cat} onClick={() => onCat(k)}>
              {CATS[k].label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="pin-wrap"
        ref={(el) => {
          pinWrap.current = el;
          viewRef.current = el;
        }}
      >
        <div className="pin">
          <div className="wrap" style={{ width: "100%" }}>
            <div className="eng">
              <div className="eng-card">
                <h3>Diagnóstico del servicio</h3>
                <p className="sub">{d.sub}</p>
                <div className="score">
                  <svg className="ring" viewBox="0 0 124 124" aria-hidden="true">
                    <circle className="bg" cx="62" cy="62" r="52" />
                    <circle
                      className="fg"
                      cx="62"
                      cy="62"
                      r="52"
                      style={{ strokeDasharray: C, strokeDashoffset: C * (1 - idx / 100) }}
                    />
                  </svg>
                  <div>
                    <div className="score-num num">
                      {Math.round(idx)}
                      <small>/100</small>
                    </div>
                    <div className="score-lbl">{d.index}</div>
                  </div>
                </div>
                <div>
                  {d.params.map((param) => {
                    const v = valAt(param, t);
                    const tag = v < 45 ? "Problema" : v < 70 ? "Mejorando" : "Sano";
                    return (
                      <div className="param" key={param[0]}>
                        <span className="nm">
                          {param[0]}
                          <span className={"tg" + (v < 45 ? " bad" : "")}>{tag}</span>
                        </span>
                        <span className="vl num">{Math.round(v)}</span>
                        <span className="trk">
                          <i style={{ width: v + "%" }} />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="eng-card">
                <h3>Evolución de la cliente</h3>
                <p className="sub">{d.client} · 4 visitas</p>
                <div className="chart-wrap">
                  <svg className="evo" viewBox="0 0 520 210" aria-hidden="true">
                    <g className="grid">
                      <line x1="0" y1="20" x2="520" y2="20" />
                      <line x1="0" y1="80" x2="520" y2="80" />
                      <line x1="0" y1="140" x2="520" y2="140" />
                      <line x1="0" y1="200" x2="520" y2="200" />
                    </g>
                    <path className="ar" d={area} />
                    <path className="ln" d={path} />
                    <g>
                      {pts.map((q, i) => {
                        const done = p >= i - 0.001;
                        return (
                          <g key={i}>
                            <circle className={"pt" + (done ? " done" : "")} cx={q[0]} cy={q[1]} r="6" />
                            {done && (
                              <text x={q[0]} y={q[1] - 14} textAnchor="middle">
                                {Math.round(indexAt(d, i / 3))}
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </g>
                  </svg>
                </div>
                <div className="visits">
                  {d.visits.map((v, i) => (
                    <div key={v} className={"visit" + (i === cur ? " on" : "")}>
                      <small>Visita {i + 1}</small>
                      <b>{v}</b>
                    </div>
                  ))}
                </div>
                <div className="benefit" aria-live="polite">
                  <b>Visita {cur + 1}.</b> {d.benefits[cur]}
                </div>
                <div className="scrub">
                  <label htmlFor="engRange">Visitas</label>
                  <input
                    type="range"
                    id="engRange"
                    min="0"
                    max="3"
                    step="0.01"
                    value={p}
                    aria-valuetext={"Visita " + (cur + 1)}
                    onChange={(e) => onScrub(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-hint" ref={hint}>
            Desplázate para ver la evolución
          </div>
        </div>
      </div>
    </section>
  );
}
