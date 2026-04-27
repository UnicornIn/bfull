import { useState } from 'react';
import DemoDashboard from './DemoDashboard';
import DemoDossier from './DemoDossier';
import DemoAI from './DemoAI';

const URLS = {
  dash: 'app.glowup.ai/dashboard',
  dossier: 'app.glowup.ai/clientes/maria-restrepo',
  ai: 'app.glowup.ai/agente'
};

function Demo() {
  const [activeTab, setActiveTab] = useState('dash');

  return (
    <section className="demo-section" id="demo">
      <div className="demo-container">
        <div className="demo-header">
          <div className="left">
            <div className="section-eyebrow">Demo en vivo</div>
            <h2>Esto no es un <span className="serif-i">video</span>.<br />Es el producto.</h2>
            <p>Interactúa con los tres módulos más potentes de GlowUp AI, aquí mismo en tu navegador. Sin registro, sin llamada, sin demos agendados. Así se siente operar tu centro con datos de verdad.</p>
          </div>
          <div className="demo-tabs" id="demoTabs">
            <button
              className={`demo-tab${activeTab === 'dash' ? ' active' : ''}`}
              onClick={() => setActiveTab('dash')}
            >✦ Analítica</button>
            <button
              className={`demo-tab${activeTab === 'dossier' ? ' active' : ''}`}
              onClick={() => setActiveTab('dossier')}
            >○ Dossier</button>
            <button
              className={`demo-tab${activeTab === 'ai' ? ' active' : ''}`}
              onClick={() => setActiveTab('ai')}
            >◈ Agente IA</button>
          </div>
        </div>

        <div className="demo-frame">
          <div className="browser-bar">
            <div className="dots"><span></span><span></span><span></span></div>
            <div className="url" id="demoUrl">{URLS[activeTab]}</div>
          </div>

          <div className={`demo-view${activeTab === 'dash' ? '' : ' hidden'}`} id="view-dash">
            <DemoDashboard active={activeTab === 'dash'} />
          </div>
          <div className={`demo-view${activeTab === 'dossier' ? '' : ' hidden'}`} id="view-dossier">
            <DemoDossier />
          </div>
          <div className={`demo-view${activeTab === 'ai' ? '' : ' hidden'}`} id="view-ai">
            <DemoAI active={activeTab === 'ai'} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Demo;
