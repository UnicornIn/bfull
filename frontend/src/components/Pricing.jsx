function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="pricing-header">
        <div className="section-eyebrow">Precios en COP</div>
        <h2>Precios que crecen <span className="serif-i">contigo.</span></h2>
        <p>Sin instalación, sin letra pequeña, sin permanencia. Cancelas cuando quieras.</p>
      </div>

      <div className="pricing-grid">
        <div className="plan">
          <div className="name">Starter</div>
          <div className="price">$189k <span className="per">/ mes</span></div>
          <div className="desc">Para centros pequeños que empiezan a ordenar su operación.</div>
          <div className="feats">
            <div>Hasta 2 sedes · 5 estilistas</div>
            <div>Agenda y facturación completas</div>
            <div>Dossier digital de clientes</div>
            <div>Reportes básicos mensuales</div>
            <div>WhatsApp de confirmación</div>
            <div>Soporte por chat</div>
          </div>
          <a href="#" className="cta-plan">Hablar con ventas</a>
        </div>

        <div className="plan featured">
          <div className="name">
            Growth
            <span className="badge-pop">✦ RECOMENDADO</span>
          </div>
          <div className="price">$389k <span className="per">/ mes</span></div>
          <div className="desc">Para centros en expansión que quieren crecer con datos, no con instinto.</div>
          <div className="feats">
            <div>Sedes y estilistas ilimitados</div>
            <div>Analítica predictiva completa</div>
            <div>Agente IA con campañas automáticas</div>
            <div>Segmentación VIP, Leal, Riesgo</div>
            <div>Upsell sugerido al checkout</div>
            <div>Inventario multi-sede</div>
            <div>Soporte prioritario · onboarding 1-a-1</div>
          </div>
          <a href="#" className="cta-plan">Hablar con ventas</a>
        </div>

        <div className="plan">
          <div className="name">Enterprise</div>
          <div className="price" style={{ fontSize: '44px' }}>A medida</div>
          <div className="desc">Para cadenas y franquicias con necesidades específicas de operación.</div>
          <div className="feats">
            <div>Todo lo del plan Growth</div>
            <div>API abierta y webhooks</div>
            <div>Integraciones contables y pasarelas</div>
            <div>SLA 99.9% · ambiente dedicado</div>
            <div>Gerente de cuenta asignado</div>
            <div>Capacitación por sede</div>
          </div>
          <a href="#" className="cta-plan">Hablar con ventas</a>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
