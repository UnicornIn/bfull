function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="#F198C0" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="9" stroke="#F198C0" strokeWidth="1.5" opacity="0.5" />
              <circle cx="16" cy="16" r="3" fill="#F198C0" />
            </svg>
            GlowUp <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>AI</span>
          </div>
          <div className="tagline">The beauty growth engine.</div>
          <p>Construido en América Latina para centros de belleza que quieren crecer con datos, no con instinto.</p>
        </div>
        <div className="col">
          <h4>Producto</h4>
          <a href="#">Analítica predictiva</a>
          <a href="#">Dossier clínico</a>
          <a href="#">Agente IA</a>
          <a href="#">Facturación</a>
          <a href="#">Precios</a>
        </div>
        <div className="col">
          <h4>Empresa</h4>
          <a href="#">Nosotros</a>
          <a href="#">Historias de éxito</a>
          <a href="#">Careers</a>
          <a href="#">Prensa</a>
        </div>
        <div className="col">
          <h4>Recursos</h4>
          <a href="#">Centro de ayuda</a>
          <a href="#">Documentación API</a>
          <a href="#">Blog</a>
          <a href="#">Contacto</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 <span className="halo">GlowUp AI</span> · Hecho con ✦ en Medellín, Colombia</span>
        <span>Términos · Privacidad · Seguridad</span>
      </div>
    </footer>
  );
}

export default Footer;
