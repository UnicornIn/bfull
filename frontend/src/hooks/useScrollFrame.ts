import { useEffect, useRef } from "react";

/** Ejecuta `cb` en cada frame de scroll/resize (limitado con requestAnimationFrame). */
export function useScrollFrame(cb: () => void) {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  useEffect(() => {
    let ticking = false;
    const frame = () => {
      ticking = false;
      cbRef.current();
    };
    const req = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    };
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    frame();
    return () => {
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
    };
  }, []);
}
