import { useEffect, useRef } from 'react';

const AI_SCRIPT = [
  { type: 'user', text: 'GlowUp, ¿qué debería hacer esta semana para mover la aguja?', delay: 400 },
  { type: 'typing', delay: 700 },
  {
    type: 'agent',
    delay: 1400,
    html: `<div class="label">GlowUp · Agente de crecimiento</div>
Analicé tus últimos 90 días. Encontré <b>3 oportunidades de alto impacto</b> que puedes ejecutar esta semana:
<div class="chips">
  <span class="chip">✦ Prevenir fuga</span>
  <span class="chip">↑ Subir precio</span>
  <span class="chip">◈ Rebalancear agenda</span>
</div>
<div class="action">
  <div>
    <div style="font-weight:600; margin-bottom:3px; color:var(--ink);">Reactivar 47 clientes VIP dormidos</div>
    <div style="color:var(--muted); font-size:11.5px;">Impacto estimado: <b>+$8.7M</b> · Mensaje personalizado por cliente.</div>
  </div>
  <button class="btn-s">Ejecutar</button>
</div>`
  },
  { type: 'user', text: 'Dale, ejecuta la campaña de reactivación', delay: 1800 },
  { type: 'typing', delay: 700 },
  {
    type: 'agent',
    delay: 1300,
    html: `<div class="label">GlowUp · Agente de crecimiento</div>
Listo. Diseñé <b>47 mensajes únicos</b> — cada uno referencia la última fórmula, estilista preferido y servicio favorito del cliente. Ofertas personalizadas al 15% para esta semana.
<div class="action">
  <div>
    <div style="font-weight:600; margin-bottom:3px; color:var(--ink);">✦ Enviando por WhatsApp · 12 respondieron ya</div>
    <div style="color:#6ec98e; font-size:11.5px;"><b>8 agendaron cita</b> · proyección: +$2.4M esta semana</div>
  </div>
</div>`
  }
];

function DemoAI({ active }) {
  const chatRef = useRef(null);
  const timersRef = useRef([]);

  useEffect(() => {
    if (active) {
      runAIDemo();
    }
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [active]);

  function runAIDemo() {
    const chat = chatRef.current;
    if (!chat) return;
    chat.innerHTML = '';
    let delay = 0;
    AI_SCRIPT.forEach((step) => {
      delay += step.delay || 500;
      const timer = setTimeout(() => {
        const typing = chat.querySelector('.typing');
        if (typing) typing.remove();
        if (step.type === 'typing') {
          const t = document.createElement('div');
          t.className = 'typing';
          t.innerHTML = '<span></span><span></span><span></span>';
          chat.appendChild(t);
        } else {
          const m = document.createElement('div');
          m.className = 'ai-msg ' + step.type;
          m.innerHTML = step.html || step.text;
          chat.appendChild(m);
        }
        chat.scrollTop = chat.scrollHeight;
      }, delay);
      timersRef.current.push(timer);
    });
  }

  return (
    <div className="ai-view">
      <div className="ai-chat" ref={chatRef} id="aiChat"></div>
    </div>
  );
}

export default DemoAI;
