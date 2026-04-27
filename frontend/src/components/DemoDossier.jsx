function DemoDossier() {
  return (
    <div className="dossier">
      <div className="dossier-side">
        <div className="dossier-profile">
          <div className="av-wrap"><div className="av">MR</div></div>
          <div className="n">María Restrepo</div>
          <div className="m">Cliente desde ene 2023</div>
          <div className="tags">
            <span className="tag vip">✦ VIP</span>
            <span className="tag">Color</span>
            <span className="tag">Cabello graso</span>
          </div>
        </div>
        <div className="dossier-stats">
          <div className="dossier-stat"><span className="l">Visitas totales</span><span className="v">47</span></div>
          <div className="dossier-stat"><span className="l">Frecuencia</span><span className="v">23 días</span></div>
          <div className="dossier-stat"><span className="l">Ticket promedio</span><span className="v">$342k</span></div>
          <div className="dossier-stat"><span className="l">Valor total</span><span className="v">$16.1M</span></div>
          <div className="dossier-stat"><span className="l">NPS</span><span className="v">10/10</span></div>
          <div className="dossier-stat"><span className="l">Próxima cita</span><span className="v">25 abr</span></div>
        </div>
      </div>
      <div className="dossier-main">
        <div className="dossier-tabs">
          <div className="dossier-tab active">Historial</div>
          <div className="dossier-tab">Fórmulas</div>
          <div className="dossier-tab">Fotos</div>
          <div className="dossier-tab">Preferencias</div>
          <div className="dossier-tab">Alergias</div>
        </div>

        <div className="timeline-item">
          <div className="timeline-date">
            <div className="d">04</div><div className="m">ABR 2026</div>
          </div>
          <div className="timeline-body">
            <div className="t">Color completo + Tratamiento profundo</div>
            <div className="d">Refresco de base castaño natural con iluminaciones en puntas. Aplicación de mascarilla restauradora post-color.</div>
            <div className="formula">
              <b>Fórmula:</b> Koleston Perfect 6/0 + 7/3 · Welloxon 20vol · 40min<br />
              <b>Tratamiento:</b> Sérum reparador argán + mascarilla hidratante
            </div>
            <div className="pro"><div className="av">SH</div> Sergio Heredia <span className="sep">·</span> $385k <span className="sep">·</span> 2h 15min</div>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-date">
            <div className="d">12</div><div className="m">MAR 2026</div>
          </div>
          <div className="timeline-body">
            <div className="t">Retoque de raíz</div>
            <div className="d">Retoque profesional siguiendo fórmula establecida en histórico.</div>
            <div className="formula">
              <b>Fórmula:</b> Koleston 6/0 · Welloxon 20vol · 30min zona raíz
            </div>
            <div className="pro"><div className="av">SH</div> Sergio Heredia <span className="sep">·</span> $185k <span className="sep">·</span> 1h 10min</div>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-date">
            <div className="d">18</div><div className="m">FEB 2026</div>
          </div>
          <div className="timeline-body">
            <div className="t">Corte + Lavado + Secado premium</div>
            <div className="d">Corte en capas largas con técnica de puntas abiertas. Cliente muy satisfecha.</div>
            <div className="pro"><div className="av">YO</div> Yadira Osorio <span className="sep">·</span> $142k <span className="sep">·</span> 1h 30min</div>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-date">
            <div className="d">22</div><div className="m">ENE 2026</div>
          </div>
          <div className="timeline-body">
            <div className="t">Color + Tratamiento</div>
            <div className="formula">
              <b>Fórmula:</b> Koleston 6/0 + 7/3 · Welloxon 20vol · 45min
            </div>
            <div className="pro"><div className="av">SH</div> Sergio Heredia <span className="sep">·</span> $378k</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoDossier;
