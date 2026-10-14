import { useEffect, useRef, useState, type ComponentType } from "react";
import { useInView } from "../../hooks/useInView";
import { isMobile, reduceMotion } from "../../lib/utils";
import { ClientesPanel, EscalaPanel, FinanzasPanel, OperacionPanel, VentasPanel } from "./Panels";
import type { PanelProps } from "./shared";

type Step = { n: string; title: string; text: string; items: string[]; Panel: ComponentType<PanelProps> };

const STEPS: Step[] = [
  {
    n: "01 · Operación",
    title: "Tu operación funciona sola.",
    text: "Agenda por profesional y por sede, bloqueos, abonos y un agente en WhatsApp que responde, cotiza y agenda mientras tu equipo atiende.",
    items: [
      "Agente de IA que confirma citas con el comprobante del abono",
      "Agenda multisede con bloqueos y estados",
      "Menos horas de recepción y cero citas perdidas en el chat",
    ],
    Panel: OperacionPanel,
  },
  {
    n: "02 · Finanzas",
    title: "Decides con números reales.",
    text: "El estado de resultados se arma solo: ingresos desde facturación, nómina, arriendo, comisiones y caja menor. Sabes cuánto ganas de verdad.",
    items: ["P&L automático, por sede y consolidado", "Caja mayor, caja menor y traslados", "Comisiones calculadas por profesional"],
    Panel: FinanzasPanel,
  },
  {
    n: "03 · Clientes",
    title: "Tus clientes vuelven.",
    text: "Ves quién está activo, en riesgo o perdido, cuándo le toca volver a cada uno, y le escribes con un clic antes de que se vaya.",
    items: ["Estado de la base en tiempo real", "Ciclo de visita por cliente", "Reactivación por WhatsApp"],
    Panel: ClientesPanel,
  },
  {
    n: "04 · Ventas",
    title: "Vendes más en cada visita.",
    text: "Ticket promedio, servicios que más facturan, productos que más rotan y cómo te pagan. Sabes qué empujar y a quién.",
    items: ["Ventas por servicio, producto y profesional", "Métodos de pago y dinero cobrado", "Inventario con stock crítico"],
    Panel: VentasPanel,
  },
  {
    n: "05 · Escala",
    title: "Pasas de un negocio a un gran negocio.",
    text: "Varias sedes, varios países, un solo tablero. Comparas, replicas lo que funciona y creces sin perder el control.",
    items: ["Comparativo entre sedes", "Colombia, Ecuador y México", "Roles y permisos por sede"],
    Panel: EscalaPanel,
  },
];

export function Promises() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const currentRef = useRef(0);
  const userLock = useRef(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [stageRef, stageSeen] = useInView<HTMLDivElement>(0.3);

  const activate = (i: number, fromClick = false) => {
    if (i === currentRef.current) return;
    currentRef.current = i;
    setCurrent(i);
    setAnimKey((k) => k + 1);
    if (fromClick && !isMobile()) {
      userLock.current = true;
      stepRefs.current[i]?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      setTimeout(() => (userLock.current = false), 900);
    }
  };

  // el panel activo se anima la primera vez que el escenario entra en pantalla
  useEffect(() => {
    if (stageSeen) setAnimKey((k) => k + 1);
  }, [stageSeen]);

  // en escritorio, el paso centrado en pantalla activa su panel
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => {
        if (isMobile() || userLock.current) return;
        es.forEach((e) => {
          if (e.isIntersecting) activate(Number((e.target as HTMLElement).dataset.panel));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    stepRefs.current.forEach((s) => s && io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <section className="promises" id="resultados" aria-labelledby="prom-title">
      <div className="wrap">
        <p className="eyebrow rv">Qué cambia en tu negocio</p>
        <h2 className="h-l rv d1" id="prom-title" style={{ maxWidth: "16ch" }}>
          Cinco resultados. Un solo sistema.
        </h2>

        <div className="scrolly">
          <div className="steps-col">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                ref={(el) => (stepRefs.current[i] = el)}
                className={"step" + (i === current ? " act" : "")}
                data-panel={i}
                onClick={() => isMobile() && activate(i, true)}
              >
                <div className="n">{s.n}</div>
                <h3 className="h-m">{s.title}</h3>
                <p>{s.text}</p>
                <ul>
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="stage-col">
            <div className="stage" ref={stageRef}>
              {STEPS.map(({ Panel, n }, i) => (
                <div key={n} className={"panel" + (i === current ? " on" : "")}>
                  <Panel run={i === current ? animKey : 0} />
                </div>
              ))}
              <div className="stage-dots" role="tablist" aria-label="Resultados">
                {STEPS.map((s, i) => (
                  <button
                    key={s.n}
                    role="tab"
                    aria-label={"Resultado " + (i + 1)}
                    aria-selected={i === current}
                    className={i === current ? "on" : undefined}
                    onClick={() => activate(i, true)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
