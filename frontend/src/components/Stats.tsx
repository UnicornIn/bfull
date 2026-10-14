import { CountUp } from "./CountUp";

export function Stats() {
  return (
    <section className="stats" aria-label="bfull en cifras">
      <div className="wrap">
        <p className="eyebrow rv">
          Un mes en una red de salones que usa <span style={{ textTransform: "none" }}>bfull</span>
        </p>
        <h2 className="h-l rv d1" style={{ maxWidth: "18ch" }}>
          Todo el negocio, medido.
        </h2>
        <div className="stats-grid">
          <div className="stat rv">
            <div className="big num">
              <CountUp to={336} dur={1600} />
            </div>
            <p>transacciones registradas, cobradas y conciliadas en un mes.</p>
          </div>
          <div className="stat rv d1">
            <div className="big num">
              <CountUp to={934} dur={1600} />
            </div>
            <p>clientes nuevos que entraron a la base, con su historial desde la primera visita.</p>
          </div>
          <div className="stat rv d2">
            <div className="big num">27%</div>
            <p>de margen real, visible sin esperar al contador.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
