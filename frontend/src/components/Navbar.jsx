function Navbar() {
  return (
    <nav>
      <div className="brand">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="#F198C0" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="9" stroke="#F198C0" strokeWidth="1.5" opacity="0.5" />
          <circle cx="16" cy="16" r="3" fill="#F198C0" />
        </svg>
        GlowUp <span style={{ color: 'var(--gold)', fontStyle: 'italic', fontSize: '16px', marginLeft: '-4px' }}>AI</span>
      </div>
      <div className="links">
        <a href="#demo">Demo</a>
        <a href="#product">Producto</a>
        <a href="#pricing">Precios</a>
        <a href="#">Historias</a>
      </div>
      <div className="right">
        {/* <a href="#" className="sign-in">Ingresar</a> */}
        <a href="https://wa.me/573023751183" className="cta">Activar mi suscripción</a>
      </div>
    </nav>
  );
}

export default Navbar;
