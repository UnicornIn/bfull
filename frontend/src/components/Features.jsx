const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  e.currentTarget.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(241, 152, 192, 0.1), rgba(241, 152, 192, 0.02) 50%)`;
};

const handleMouseLeave = (e) => {
  e.currentTarget.style.background = '';
};

function Features() {
  return (
    <section className="features" id="product">
      <div className="section-eyebrow" style={{ color: 'var(--gold)' }}>El sistema completo</div>
      <h2>
        Cuatro motores que <span className="italic">nunca duermen.</span><br />
        Uno que <span className="italic">siempre aprende.</span>
      </h2>

      <div className="features-grid">
        <div className="feature" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="num">(01) ✦ Inteligencia</div>
          <h3>Analítica <span className="italic">predictiva</span></h3>
          <p>Cada cita, producto y estilista se convierte en señal. GlowUp detecta patrones invisibles — quién está a punto de irse, qué servicio subirías de precio, en qué hora ganas más.</p>
          <div className="list">
            <div>Predicción de fuga con 14 días de anticipación</div>
            <div>Segmentación automática VIP, Leal, Regular, Riesgo</div>
            <div>LTV y CAC calculados en tiempo real</div>
            <div>Cohortes mensuales con retención por estilista</div>
          </div>
        </div>

        <div className="feature" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="num">(02) ○ Memoria</div>
          <h3>Dossier <span className="italic">clínico</span></h3>
          <p>La historia clínica que tus clientes merecen. Fórmulas exactas, alergias, fotos antes/después, preferencias, historial completo — buscable, conectado, inmediato.</p>
          <div className="list">
            <div>Fórmulas químicas exactas y trazables</div>
            <div>Fotos por cita con comparador antes/después</div>
            <div>Alertas automáticas de alergias e intolerancias</div>
            <div>Búsqueda por servicio, producto o estilista</div>
          </div>
        </div>

        <div className="feature" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="num">(03) ◈ Acción</div>
          <h3>Agente que <span className="italic">ejecuta</span></h3>
          <p>No solo te da insights — los activa. GlowUp envía recordatorios, recupera clientes dormidos, sugiere upsells al checkout y cierra la agenda sin que lo pidas.</p>
          <div className="list">
            <div>Campañas automáticas de reactivación y cumpleaños</div>
            <div>Confirmación de citas por WhatsApp, sin tocar un dedo</div>
            <div>Sugerencias de upsell personalizadas en facturación</div>
            <div>Optimizador de agenda que balancea carga por estilista</div>
          </div>
        </div>

        <div className="feature" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="num">(04) ◇ Operación</div>
          <h3>Facturación <span className="italic">sin fricción</span></h3>
          <p>Agenda, caja, inventario, venta directa y reportes — una sola herramienta que reemplaza cinco. Diseñada para el flujo real de un centro de belleza LATAM.</p>
          <div className="list">
            <div>Venta directa con múltiples vendedores por ítem</div>
            <div>Métodos de pago locales Nequi, Daviplata, tarjeta</div>
            <div>Inventario sincronizado y alertas de stock bajo</div>
            <div>Cierre de caja diario con cuadre automático</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
