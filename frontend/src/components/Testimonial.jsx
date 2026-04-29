function Testimonial() {
  return (
    <section className="testimonial">
      <div style={{ textAlign: 'center' }}>
        <div className="section-eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>Caso de estudio</div>
      </div>
      <blockquote>
        GlowUp nos abrió los ojos. Vimos que <span className="highlight">el 40% de nuestros ingresos</span> venía de 120 clientes que casi perdíamos. En seis meses subimos facturación <span className="num">2.3×</span> sin contratar a nadie.
      </blockquote>
      <div className="author">
        <div className="av">DG</div>
        <div className="info">
          <div className="n">Delcy Giraldo</div>
          <div className="r">Fundadora · Rizos Felices  · 18 sedes</div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
