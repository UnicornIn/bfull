import { useEffect, useState } from "react";
import { ease, reduceMotion } from "../lib/utils";

/**
 * Cuenta de 0 a `to`. Arranca cuando `run` es truthy y vuelve a arrancar
 * cada vez que cambia (útil pasar un contador incremental).
 */
export function useCountUp(to: number, run: number | boolean, dur = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (reduceMotion) {
      setValue(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      setValue(to * ease(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run, dur]);
  return value;
}
