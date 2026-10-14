import { useState } from "react";
import { useScrollFrame } from "../hooks/useScrollFrame";
import { Logo } from "./Brand";

export function Nav() {
  const [onDark, setOnDark] = useState(false);

  // nav en blanco sobre la sección oscura del motor
  useScrollFrame(() => {
    const motor = document.getElementById("motor");
    if (!motor) return;
    const r = motor.getBoundingClientRect();
    setOnDark(r.top < 60 && r.bottom > 60);
  });

  return (
    <nav className={"nav" + (onDark ? " on-dark" : "")} aria-label="Principal">
      <div className="wrap">
        <Logo />
        <div className="nav-links">
          <a href="#resultados">Qué logras</a>
          <a href="#finanzas">Finanzas</a>
          <a href="#motor">Motor de diagnóstico</a>
          <a href="#calculadora">Calculadora</a>
        </div>
        <a className="btn btn-ink" href="#demo">
          Agendar demo
        </a>
      </div>
    </nav>
  );
}
