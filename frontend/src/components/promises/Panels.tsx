import { useEffect, useRef, useState } from "react";
import { fmtCOP, fmtN, reduceMotion } from "../../lib/utils";
import { AppBar } from "../AppBar";
import { CountUp } from "../CountUp";
import { BarRow, Kpi, pct, type PanelProps } from "./shared";

/* ---------- 0 · Operación: agenda + agente de WhatsApp ---------- */
const BUBBLES: { side: "in" | "out"; text: string }[] = [
  { side: "in", text: "Hola, ¿tienen cita mañana a las 9 para rizos?" },
  { side: "out", text: "¡Hola! Sí. Anny tiene 9:00 a.m. El Completo Alta cuesta $187.000. Para separarla, un abono de $50.000." },
  { side: "in", text: "📎 Comprobante · $50.000" },
  { side: "out", text: "Recibido, leí el comprobante por $50.000." },
];

export function OperacionPanel({ run }: PanelProps) {
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);
  const [estRun, setEstRun] = useState(0);
  const doneRef = useRef(false);

  const confirm = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setDone(true);
    setEstRun((k) => k + 1);
  };

  useEffect(() => {
    if (!run) return;
    doneRef.current = false;
    setDone(false);
    setShown(0);
    const timers = BUBBLES.map((_, i) =>
      window.setTimeout(() => setShown((n) => Math.max(n, i + 1)), reduceMotion ? 0 : 400 + i * 1000)
    );
    timers.push(window.setTimeout(confirm, reduceMotion ? 0 : 5200));
    return () => timers.forEach(clearTimeout);
  }, [run]);

  return (
    <div className="app">
      <AppBar tabs={["Agenda", "Callcenter", "Clientes"]} />
      <div className="app-body">
        <div className="app-h">
          <div>
            <h4>Agenda</h4>
            <small>
              Hoy · <span>{done ? 13 : 12}</span> citas ·{" "}
              <span className="num">
                {done ? <CountUp to={1519000} fmt={fmtCOP} run={estRun} dur={700} /> : "$1.332.000"}
              </span>{" "}
              estimado
            </small>
          </div>
          <span className="sede">SEDE NORTE</span>
        </div>
        <div className="two ag-two">
          <div className="agenda" aria-label="Agenda del día">
            <div className="ag-h" style={{ borderRight: "1px solid rgba(22,20,27,.06)" }} />
            {[
              ["LG", "Laura G."],
              ["SH", "Sergio H."],
              ["CC", "Camila C."],
              ["AS", "Anny S."],
            ].map(([ini, name]) => (
              <div className="ag-h" key={ini}>
                <i>{ini}</i>
                <span>{name}</span>
              </div>
            ))}
            <div className="ag-t">
              <span>9:00</span>
              <span>10:00</span>
              <span>11:00</span>
              <span>12:00</span>
              <span>1:00</span>
            </div>
            <div className="ag-c">
              <div className="ev a" style={{ top: 40, height: 56 }}>
                <b>Shirly T.</b>Completo media
              </div>
              <div className="ev blk" style={{ top: 118, height: 40 }}>
                Almuerzo
              </div>
            </div>
            <div className="ag-c">
              <div className="ev a" style={{ top: 4, height: 50 }}>
                <b>Álvaro G.</b>Corte diseño
              </div>
              <div className="ev a" style={{ top: 60, height: 52 }}>
                <b>Sandra L.</b>Completo media
              </div>
              <div className="ev b" style={{ top: 118, height: 34 }}>
                <b>Lirio G.</b>Barbería
              </div>
            </div>
            <div className="ag-c">
              <div className="ev blk" style={{ top: 4, height: 110 }}>
                No disponible
              </div>
            </div>
            <div className="ag-c">
              <div className="ev b" style={{ top: 80, height: 40 }}>
                <b>Andys B.</b>Color
              </div>
              {done && (
                <div className="ev a new" style={{ top: 4, height: 56 }}>
                  <b>Nueva · WhatsApp</b>Completo alta
                </div>
              )}
            </div>
          </div>
          <div className="wa" aria-live="polite">
            {BUBBLES.map((b, i) => (
              <div key={i} className={`bub ${b.side}` + (i < shown ? " show" : "")}>
                {b.text}
                {i === BUBBLES.length - 1 && (
                  <button className={"confirm" + (done ? " done" : "")} disabled={done} onClick={confirm}>
                    {done ? "Agendada · abono registrado en caja" : "Confirmar agenda"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 1 · Finanzas ---------- */
export function FinanzasPanel({ run }: PanelProps) {
  return (
    <div className="app">
      <AppBar tabs={["Finanzas", "Cierre de caja", "Traslados"]} />
      <div className="app-body">
        <div className="app-h">
          <div>
            <h4>Estado de resultados</h4>
            <small>Mes actual · todas las sedes</small>
          </div>
          <span className="sede">CONSOLIDADO</span>
        </div>
        <div className="kpis">
          <Kpi sel l="Ingresos" to={67191371} s="Auto + manual" run={run} />
          <Kpi l="Egresos" to={48894768} s="Caja mayor + menor" run={run} />
          <Kpi l="Utilidad" to={18296603} s="Consolidado" run={run} style={{ color: "#3D0A78" }} />
          <Kpi l="Margen" to={27} s="sobre ingresos" run={run} fmt={pct} />
        </div>
        <div className="two">
          <div className="box">
            <h5>
              Ingresos <span>origen del dato</span>
            </h5>
            <div className="row">
              <span>
                Servicios<span className="chip">AUTO</span>
              </span>
              <span className="r num">$45.055.001</span>
            </div>
            <div className="row">
              <span>
                Productos<span className="chip">AUTO</span>
              </span>
              <span className="r num">$17.345.869</span>
            </div>
            <div className="row">
              <span>
                Manuales<span className="chip man">MANUAL</span>
              </span>
              <span className="r num">$2.500.000</span>
            </div>
            <div className="row">
              <b>Total</b>
              <span className="r num">$67.191.371</span>
            </div>
          </div>
          <div className="box">
            <h5>
              Gastos por categoría <span>% del total</span>
            </h5>
            <BarRow neg label="Nómina administrativa" value="$12.922.840" w={57} run={run} />
            <BarRow neg label="Caja menor" value="$7.363.300" w={33} run={run} />
            <BarRow neg label="Arriendo" value="$2.311.520" w={10} run={run} />
            <BarRow neg label="Marketing" value="$2.147.171" w={9} run={run} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 2 · Clientes ---------- */
export function ClientesPanel({ run }: PanelProps) {
  const [sent, setSent] = useState(false);
  return (
    <div className="app">
      <AppBar tabs={["Clientes", "Marketing", "Diagnóstico"]} />
      <div className="app-body">
        <div className="kpis">
          <Kpi l="Atendidos" to={306} s="este mes" run={run} fmt={fmtN} />
          <Kpi l="Nuevos" to={934} s="este mes" run={run} fmt={fmtN} />
          <Kpi l="Ticket" to={186019} s="por visita" run={run} />
          <Kpi sel l="LTV" to={1814581} s="por cliente" run={run} />
        </div>
        <div className="two">
          <div className="box">
            <h5>
              Estado de la base <span>8.552 clientes</span>
            </h5>
            <div className="state-row">
              <span>
                <i className="dot" style={{ background: "#3D0A78" }} />
                Activos
              </span>
              <b className="num">1.542</b>
            </div>
            <div className="state-row">
              <span>
                <i className="dot" style={{ background: "#16141B" }} />
                En riesgo
              </span>
              <b className="num">601</b>
            </div>
            <div className="state-row">
              <span>
                <i className="dot" style={{ background: "rgba(22,20,27,.12)" }} />
                Perdidos
              </span>
              <b className="num">6.409</b>
            </div>
          </div>
          <div className="box">
            <h5>
              Valentina R. <span>91 días extra</span>
            </h5>
            <div style={{ fontSize: "11.5px", color: "rgba(22,20,27,.62)" }}>
              Última visita hace 121 días · ciclo de 30 días
            </div>
            <div className="recbar">
              <i />
            </div>
            <div className="card-opp">
              <div>
                <b>Reagendamiento urgente</b>
                <small>WhatsApp de reactivación</small>
              </div>
              <button className={"sendbtn" + (sent ? " sent" : "")} onClick={() => setSent((s) => !s)}>
                {sent ? "Enviado ✓" : "Enviar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 3 · Ventas ---------- */
export function VentasPanel({ run }: PanelProps) {
  return (
    <div className="app">
      <AppBar tabs={["Ventas", "Productos", "Facturación"]} />
      <div className="app-body">
        <div className="kpis">
          <Kpi sel l="Ventas" to={62502370} s="mes actual" run={run} />
          <Kpi l="Servicios" to={45055001} s="72%" run={run} />
          <Kpi l="Productos" to={17345869} s="28%" run={run} />
          <Kpi l="Transacciones" to={336} s="ticket $186.019" run={run} fmt={fmtN} />
        </div>
        <div className="two">
          <div className="box">
            <h5>
              Top servicios <span>por ingreso</span>
            </h5>
            {[
              ["Completo alta", "$7.797.000"],
              ["Corte con diseño", "$6.780.000"],
              ["Completo media", "$6.495.000"],
              ["Color", "$6.163.000"],
            ].map(([n, v]) => (
              <div className="row" key={n}>
                <span>{n}</span>
                <span className="r num">{v}</span>
              </div>
            ))}
          </div>
          <div className="box">
            <h5>
              Cobrado por método <span>dinero recibido</span>
            </h5>
            <BarRow label="Transferencia" value="47%" w={47} run={run} />
            <BarRow label="Efectivo" value="20%" w={20} run={run} />
            <BarRow label="Débito" value="19%" w={19} run={run} />
            <BarRow label="Crédito" value="11%" w={11} run={run} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 4 · Escala: sedes ---------- */
const SEDES: [string, number, number, number, number][] = [
  ["Norte · Bogotá", 84600000, 198000, 46, 88],
  ["Sur · Cali", 62500000, 186019, 38, 81],
  ["Poblado · Medellín", 51200000, 176000, 34, 74],
  ["Quito", 38900000, 164000, 29, 69],
  ["CDMX", 27400000, 158000, 24, 61],
];

export function EscalaPanel({ run }: PanelProps) {
  return (
    <div className="app">
      <AppBar tabs={["Sedes", "Profesionales", "Usuarios"]} />
      <div className="app-body">
        <div className="app-h">
          <div>
            <h4>Sedes</h4>
            <small>Comparativo del mes · convertido a COP</small>
          </div>
          <span className="sede">SUPER ADMIN</span>
        </div>
        <div className="box tscroll" style={{ padding: "4px 8px" }}>
          <table className="sedes-t">
            <thead>
              <tr>
                <th>Sede</th>
                <th>Ventas</th>
                <th>Ticket</th>
                <th>Vuelven</th>
                <th>Ocupación</th>
              </tr>
            </thead>
            <tbody>
              {SEDES.map(([name, sales, ticket, back, occ]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td className="num">
                    <CountUp to={sales} fmt={fmtCOP} run={run} />
                  </td>
                  <td className="num">{fmtCOP(ticket)}</td>
                  <td className="num up">{back}%</td>
                  <td className="num">{occ}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="two" style={{ marginTop: 8 }}>
          <div className="box">
            <h5>
              Buena práctica <span>para replicar</span>
            </h5>
            <div style={{ fontSize: 12, lineHeight: 1.5 }}>
              Sede Norte vende producto en el 46% de sus servicios. Si las demás llegan al 35%, son{" "}
              <b style={{ color: "#3D0A78" }}>$9,4 M</b> más al mes.
            </div>
          </div>
          <div className="box">
            <h5>
              Stock crítico <span>Sede Sur</span>
            </h5>
            <div className="row">
              <span>Acondicionador salón</span>
              <span className="r" style={{ color: "#3D0A78" }}>
                0 uds
              </span>
            </div>
            <div className="row">
              <span>Gorro microfibra</span>
              <span className="r" style={{ color: "#3D0A78" }}>
                2 uds
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
