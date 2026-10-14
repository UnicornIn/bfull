export const fmtCOP = (n: number) => "$" + Math.round(n).toLocaleString("es-CO");
export const fmtN = (n: number) => Math.round(n).toLocaleString("es-CO");
export const ease = (t: number) => 1 - Math.pow(1 - t, 3);
export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const short = (v: number) => "$" + (v / 1e6).toFixed(1).replace(".", ",") + " M";

export const reduceMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isMobile = () => window.innerWidth <= 960;
