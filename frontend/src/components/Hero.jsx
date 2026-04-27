function Hero() {
  return (
    <section className="hero">
      <div className="eyebrow">
        <span className="pulse"></span> Construido para América Latina · v2.6
      </div>

      <h1>
        The beauty<br />
        growth <span className="italic">engine.</span>
      </h1>

      <p className="sub">
        GlowUp convierte cada visita en <b>inteligencia accionable</b>. Dossier clínico, analítica predictiva y un agente de IA que no duerme —
        en una sola plataforma que hace crecer tu centro de belleza.
      </p>

      <div className="actions">
        <a href="#demo" className="btn-primary">Ver demo en vivo →</a>
        <a href="#" className="btn-secondary"><span className="play">▶</span> 90 segundos</a>
      </div>

      <div className="hero-meta">
        <div className="m"><div className="v"><span className="italic">+38</span>%</div><div className="l">Retención promedio</div></div>
        <div className="m"><div className="v"><span className="italic">2.4</span>×</div><div className="l">Ticket promedio</div></div>
        <div className="m"><div className="v">1,<span className="italic">200</span>+</div><div className="l">Centros en LATAM</div></div>
        <div className="m"><div className="v"><span className="italic">4.9</span></div><div className="l">Valoración operadores</div></div>
      </div>

      <div className="hero-orb">
        <div className="ring"></div>
        <div className="ring r2"></div>
        <div className="ring r3"></div>
        <div className="glow"></div>
        <div className="orbit-text">
          <svg width="340" height="340" viewBox="0 0 340 340">
            <defs>
              <path id="orbitCircle" d="M 170, 170 m -160, 0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0" />
            </defs>
            <text fontFamily="Avenir, Avenir Next, sans-serif" fontSize="10" fontWeight="500" letterSpacing="3" fill="#F198C0">
              <textPath href="#orbitCircle">GROWTH • ANALYTICS • LOYALTY • AI • BEAUTY • DATA • GROWTH • ANALYTICS • LOYALTY • </textPath>
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Hero;
