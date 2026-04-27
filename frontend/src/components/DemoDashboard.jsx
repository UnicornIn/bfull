import { useEffect, useRef } from 'react';

function DemoDashboard({ active }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (active && chartRef.current) {
      drawChart();
    }
  }, [active]);

  function drawChart() {
    const chart = chartRef.current;
    if (!chart) return;
    const vals = [42, 48, 45, 52, 58, 55, 62, 68, 65, 72, 78, 85, 82, 91];
    chart.innerHTML = '';
    vals.forEach((v, i) => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = '0%';
      chart.appendChild(bar);
      setTimeout(() => { bar.style.height = v + '%'; }, i * 45);
    });
  }

  return (
    <div className="dash-body">
      <div className="dash-head">
        <div>
          <h3>Bellezza Studio · Medellín</h3>
          <div className="sub">Hoy, viernes 17 abril 2026 · Datos en tiempo real</div>
        </div>
        <div className="live"><span className="dot"></span>EN VIVO</div>
      </div>

      <div className="dash-grid">
        <div className="dash-card dark">
          <div className="lbl">Ingresos del mes</div>
          <div className="val">$48.2M</div>
          <div className="delta up">23.4% vs mes anterior</div>
          <div className="chart" ref={chartRef} id="chart"></div>
        </div>
        <div className="dash-card">
          <div className="lbl">Clientes activos</div>
          <div className="val">1,284</div>
          <div className="delta up">112 nuevos este mes</div>
          <div className="segmentation">
            <div className="seg-bar">
              <div style={{ flex: 3, background: 'var(--ink)' }}></div>
              <div style={{ flex: 2, background: 'var(--gold-light)' }}></div>
              <div style={{ flex: 1, background: '#ff7070' }}></div>
            </div>
            <div className="seg-labels">
              <span><b>52%</b> Leales</span>
              <span><b>33%</b> Regulares</span>
              <span><b>15%</b> Riesgo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dash-kpis">
        <div className="dash-kpi"><div className="lbl">Ticket promedio</div><div className="val">$187k</div><div className="sub">+$34k vs prom.</div></div>
        <div className="dash-kpi"><div className="lbl">Retención 90d</div><div className="val">74%</div><div className="sub">sector 52%</div></div>
        <div className="dash-kpi"><div className="lbl">Ocupación</div><div className="val">91%</div><div className="sub">sillas activas</div></div>
        <div className="dash-kpi"><div className="lbl">LTV</div><div className="val">$2.8M</div><div className="sub">últimos 12m</div></div>
      </div>

      <div className="dash-bottom">
        <div className="dash-insights">
          <div className="insights-head">
            <div className="title">Recomendaciones de GlowUp</div>
            <div className="ai">IA</div>
          </div>
          <div className="insight">
            <div className="ico">!</div>
            <div className="txt">
              <div className="h">47 clientes VIP no han vuelto en 60 días</div>
              <div className="d">Pérdida potencial estimada. Activa campaña de reactivación personalizada.</div>
            </div>
            <div className="val">$8.7M</div>
          </div>
          <div className="insight">
            <div className="ico">↑</div>
            <div className="txt">
              <div className="h">Sube el precio de "Color completo" 12%</div>
              <div className="d">Tu demanda supera 94%. Mercado tolera +18% sin fuga.</div>
            </div>
            <div className="val">+$3.2M</div>
          </div>
          <div className="insight">
            <div className="ico">◈</div>
            <div className="txt">
              <div className="h">Yadira está sobre-asignada los sábados</div>
              <div className="d">Reasigna 4 citas a Camila Cortes para equilibrar carga.</div>
            </div>
            <div className="val">12h</div>
          </div>
        </div>
        <div className="dash-clients">
          <div className="insights-head">
            <div className="title">Atención hoy</div>
            <div className="ai">4</div>
          </div>
          <div className="client-row">
            <div className="av vip">MR</div>
            <div className="n">María Restrepo</div>
            <span className="segment vip">VIP</span>
          </div>
          <div className="client-row">
            <div className="av">LG</div>
            <div className="n">Laura González</div>
            <span className="segment riesgo">FUGA</span>
          </div>
          <div className="client-row">
            <div className="av">PJ</div>
            <div className="n">Paula Jiménez</div>
            <span className="segment leal">LEAL</span>
          </div>
          <div className="client-row">
            <div className="av vip">VC</div>
            <div className="n">Valentina Cano</div>
            <span className="segment vip">VIP</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoDashboard;
