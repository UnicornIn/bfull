import { Fragment, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";
import { useScrollFrame } from "../hooks/useScrollFrame";
import { clamp, reduceMotion } from "../lib/utils";

const TEXT = "8.552 clientes en la base. 6.409 no habían vuelto. Tres de cada cuatro. Y nadie lo sabía.";
const WORDS = TEXT.split(/\s+/);
const BASE: [string, number, string][] = [
  ["bb-a", 18, "18%"],
  ["bb-r", 7, "7%"],
  ["bb-p", 75, "75% perdidos"],
];

export function LitText() {
  const lit = useRef<HTMLHeadingElement>(null);
  const [on, setOn] = useState(reduceMotion ? WORDS.length : 0);
  const [barRef, barSeen] = useInView<HTMLDivElement>(0.5);

  // texto que se ilumina palabra por palabra
  useScrollFrame(() => {
    if (reduceMotion || !lit.current) return;
    const vh = window.innerHeight;
    const r = lit.current.getBoundingClientRect();
    const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0, 1);
    setOn(Math.round(p * WORDS.length));
  });

  return (
    <section className="lit" aria-labelledby="lit-title">
      <div className="wrap">
        <h2 className="lit-text" id="lit-title" ref={lit}>
          {WORDS.map((w, i) => (
            <Fragment key={i}>
              <span className={"w" + (/^6\.409|^Tres|^cuatro/.test(w) ? " acc" : "") + (i < on ? " on" : "")}>{w}</span>
              {i < WORDS.length - 1 ? " " : null}
            </Fragment>
          ))}
        </h2>
        <div
          className="basebar"
          ref={barRef}
          role="img"
          aria-label="Activos 18 por ciento, en riesgo 7 por ciento, perdidos 75 por ciento"
        >
          {BASE.map(([cls, w, label]) => (
            <div key={cls} className={cls} style={{ width: barSeen ? w + "%" : 0 }}>
              {label}
            </div>
          ))}
        </div>
        <div className="basekey">
          <span>
            <i className="dot" style={{ background: "#3D0A78" }} />
            <b className="num">1.542</b> activos
          </span>
          <span>
            <i className="dot" style={{ background: "#16141B" }} />
            <b className="num">601</b> en riesgo
          </span>
          <span>
            <i className="dot" style={{ background: "rgba(22,20,27,.12)" }} />
            <b className="num">6.409</b> perdidos
          </span>
        </div>
      </div>
    </section>
  );
}
