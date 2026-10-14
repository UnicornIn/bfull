import { clamp, lerp } from "../../lib/utils";

/** [nombre, valor inicial, valor final, curva] */
export type Param = [string, number, number, number];
/** [servicio, problema, % que mejora, puntos de mejora, visitas] */
export type Svc = [string, string, number, number, number];

export type Category = {
  label: string;
  thing: string;
  index: string;
  client: string;
  sub: string;
  params: Param[];
  visits: string[];
  benefits: string[];
  next: string;
  svc: Svc[];
};

export type CatKey = "cabello" | "piel" | "barberia" | "wellness";

export const CATS: Record<CatKey, Category> = {
  cabello: {
    label: "Cabello",
    thing: "tu rizo",
    index: "Índice de salud capilar",
    client: "Valentina R.",
    sub: "Evaluación del rizo en cada visita · 0 a 100",
    params: [
      ["Definición del rizo", 32, 86, 0.8],
      ["Hidratación", 28, 82, 1],
      ["Control del frizz", 22, 76, 1.3],
      ["Porosidad equilibrada", 40, 72, 1.6],
      ["Puntas sanas", 30, 84, 0.7],
    ],
    visits: ["Diagnóstico + Completo alta", "Hidratación profunda", "Corte con diseño", "Mantenimiento"],
    benefits: [
      "Se detectan frizz alto, porosidad alta y puntas abiertas. Plan de 4 visitas.",
      "La hidratación sube 30 puntos: el rizo retiene agua y el frizz baja.",
      "El corte elimina puntas dañadas y la definición se dispara.",
      "El rizo se sostiene sano entre visitas con la rutina en casa.",
    ],
    next: "Mantenimiento en 5 semanas",
    svc: [
      ["Completo alta", "Frizz y falta de definición", 86, 48, 3],
      ["Hidratación profunda", "Resequedad y porosidad alta", 91, 41, 2],
      ["Corte con diseño", "Puntas abiertas y forma", 78, 36, 1],
      ["Color con cuidado", "Daño por decoloración", 72, 29, 4],
    ],
  },
  piel: {
    label: "Piel",
    thing: "tu piel",
    index: "Índice de salud de la piel",
    client: "Laura M.",
    sub: "Evaluación facial en cada visita · 0 a 100",
    params: [
      ["Hidratación", 34, 80, 0.9],
      ["Textura", 30, 74, 1.2],
      ["Luminosidad", 38, 82, 0.8],
      ["Tono uniforme", 26, 64, 1.7],
      ["Poros", 36, 70, 1.3],
    ],
    visits: ["Diagnóstico + limpieza profunda", "Hidrafacial", "Peeling suave", "Mantenimiento"],
    benefits: [
      "Se detectan deshidratación, textura irregular y manchas leves.",
      "La hidratación mejora y la piel se ve más luminosa desde la segunda visita.",
      "El peeling afina la textura y empieza a unificar el tono.",
      "La piel se mantiene con la rutina recomendada en casa.",
    ],
    next: "Hidrafacial de mantenimiento en 4 semanas",
    svc: [
      ["Hidrafacial", "Deshidratación y opacidad", 89, 44, 2],
      ["Limpieza profunda", "Poros obstruidos", 84, 38, 2],
      ["Peeling suave", "Textura y manchas", 74, 33, 3],
      ["Microneedling", "Marcas y cicatrices", 68, 31, 4],
    ],
  },
  barberia: {
    label: "Barbería",
    thing: "tu barba",
    index: "Índice barba y cuero cabelludo",
    client: "Andrés P.",
    sub: "Evaluación en cada visita · 0 a 100",
    params: [
      ["Cuero cabelludo sano", 36, 82, 1],
      ["Hidratación de la barba", 30, 80, 0.9],
      ["Control de irritación", 28, 78, 1.2],
      ["Densidad visible", 44, 66, 1.8],
      ["Definición del corte", 40, 90, 0.6],
    ],
    visits: ["Diagnóstico + corte", "Tratamiento anticaspa", "Perfilado + hidratación", "Mantenimiento"],
    benefits: [
      "Se detectan caspa, barba reseca e irritación por afeitado.",
      "El tratamiento baja la irritación y limpia el cuero cabelludo.",
      "La barba se ve más densa e hidratada con el perfilado.",
      "El corte y la barba se sostienen con la rutina en casa.",
    ],
    next: "Corte y perfilado en 3 semanas",
    svc: [
      ["Tratamiento anticaspa", "Caspa y picazón", 88, 42, 2],
      ["Barba con hidratación", "Barba reseca y quebradiza", 85, 46, 2],
      ["Perfilado con toalla caliente", "Irritación por afeitado", 81, 39, 1],
      ["Corte con diseño", "Forma y definición", 93, 38, 1],
    ],
  },
  wellness: {
    label: "Wellness",
    thing: "tu bienestar",
    index: "Índice de bienestar",
    client: "Carolina S.",
    sub: "Evaluación en cada sesión · 0 a 100",
    params: [
      ["Alivio de tensión", 26, 80, 0.8],
      ["Calidad del sueño", 34, 74, 1.3],
      ["Movilidad", 40, 78, 1.1],
      ["Estrés percibido (control)", 24, 70, 1.2],
      ["Energía", 36, 76, 1],
    ],
    visits: ["Evaluación + masaje descontracturante", "Drenaje y relajación", "Terapia de piedras calientes", "Mantenimiento"],
    benefits: [
      "Se detectan tensión alta en espalda, estrés y sueño irregular.",
      "La tensión baja y mejora la calidad del sueño.",
      "La movilidad sube y el estrés percibido baja notoriamente.",
      "El bienestar se sostiene con sesiones de mantenimiento.",
    ],
    next: "Sesión de mantenimiento en 3 semanas",
    svc: [
      ["Masaje descontracturante", "Tensión muscular", 90, 47, 2],
      ["Drenaje linfático", "Retención de líquidos", 82, 35, 3],
      ["Piedras calientes", "Estrés y sueño", 86, 40, 2],
      ["Reflexología", "Cansancio y energía", 74, 30, 3],
    ],
  },
};

export const CAT_KEYS = Object.keys(CATS) as CatKey[];

export const valAt = (p: Param, t: number) => lerp(p[1], p[2], Math.pow(clamp(t, 0, 1), p[3]));

export const indexAt = (c: Category, t: number) => c.params.reduce((s, p) => s + valAt(p, t), 0) / c.params.length;
