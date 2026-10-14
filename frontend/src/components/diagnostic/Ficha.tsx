import { useEffect, useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";
import { useScrollFrame } from "../../hooks/useScrollFrame";
import { clamp, ease, reduceMotion } from "../../lib/utils";
import { BfIcon } from "../Brand";
import { CATS, indexAt, type CatKey } from "./data";

export function Ficha({ cat }: { cat: CatKey }) {
  const phone = useRef<HTMLDivElement | null>(null);
  const [viewRef, phoneSeen] = useInView<HTMLDivElement>(0.3);
  const [cardsIn, setCardsIn] = useState(0);

  // tarjetas en cascada (y de nuevo al cambiar de categoría)
  useEffect(() => {
    setCardsIn(0);
    if (!phoneSeen) return;
    const timers = [0, 1, 2].map((i) =>
      window.setTimeout(() => setCardsIn((n) => Math.max(n, i + 1)), reduceMotion ? 0 : 250 + i * 260)
    );
    return () => timers.forEach(clearTimeout);
  }, [phoneSeen, cat]);

  // el celular sube y se endereza con el scroll
  useScrollFrame(() => {
    if (reduceMotion || !phone.current) return;
    const vh = window.innerHeight;
    const r = phone.current.getBoundingClientRect();
    const e = ease(clamp((vh - r.top) / (vh * 0.8), 0, 1));
    phone.current.style.transform = `translateY(${(90 * (1 - e)).toFixed(1)}px) rotate(${(-7 * (1 - e)).toFixed(2)}deg)`;
  });

  const d = CATS[cat];
  const first = Math.round(indexAt(d, 0));
  const last = Math.round(indexAt(d, 1));
  const card = (i: number) => "fcard" + (cardsIn > i ? " in" : "");

  return (
    <section className="ficha-sec" aria-labelledby="ficha-title">
      <div className="wrap ficha-grid">
        <div>
          <p className="eyebrow rv">Ficha de evolución</p>
          <h2 className="h-l rv d1" id="ficha-title">
            Tu cliente ve su progreso. Por eso vuelve.
          </h2>
          <p className="lede rv d2">
            Después de cada visita, la cliente recibe por WhatsApp su ficha: cómo llegó, cómo va, qué mejoró y qué sigue.
            Resultados reales, no promesas.
          </p>
          <div className="ficha-points">
            <div className="rv">
              <h3>Información de valor</h3>
              <p>
                El diagnóstico traducido a lenguaje simple: qué problema tiene, qué beneficio le da cada servicio y qué
                productos lo sostienen en casa.
              </p>
            </div>
            <div className="rv d1">
              <h3>Evolución real, visita a visita</h3>
              <p>
                Antes y después con los mismos criterios de medición. La cliente deja de comprar un servicio y empieza a
                seguir un plan.
              </p>
            </div>
            <div className="rv d2">
              <h3>La próxima cita, sugerida</h3>
              <p>El motor calcula cuándo debe volver según su evolución y deja la cita a un clic.</p>
            </div>
          </div>
        </div>
        <div
          className="phone"
          ref={(el) => {
            phone.current = el;
            viewRef.current = el;
          }}
        >
          <div className="phone-in">
            <div className="ph-top">
              <span className="av">
                <BfIcon style={{ width: 34, height: 34 }} />
              </span>
              <div>
                <b>Sede Norte</b>
                <small>Tu ficha de evolución</small>
              </div>
            </div>
            <div className="ph-body">
              <div className={card(0)}>
                <div className="k">Tu progreso · 4 visitas</div>
                <h4>
                  {d.client.split(" ")[0]}, {d.thing} ganó {last - first} puntos en 4 visitas.
                </h4>
                <div className="ba">
                  <div>
                    <div className="sc num">{first}</div>
                    <small>Primera visita</small>
                  </div>
                  <div className="arr">→</div>
                  <div>
                    <div className="sc aft num">{last}</div>
                    <small>Hoy</small>
                  </div>
                </div>
              </div>
              <div className={card(1)}>
                <div className="k">Lo que mejoró</div>
                <div>
                  {d.params.slice(0, 4).map((p) => (
                    <div className="mini-row" key={p[0]}>
                      <span>{p[0]}</span>
                      <span>
                        {p[1]} → <b>{p[2]}</b>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={card(2)}>
                <div className="k">Tu próximo paso</div>
                <h4 style={{ fontSize: 16, marginBottom: 0 }}>{d.next}</h4>
                <span className="cta">Agendar en un clic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
