# bfull — landing

Landing de bfull en React + Vite + TypeScript, construida a partir de `bfull-landing.html`.

## Comandos

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/ listo para Vercel, Netlify o cualquier hosting estático
npm run preview  # sirve la build de producción
```

Requiere Node 18 o superior.

## Estructura

```
src/
  config.ts              número y enlaces de WhatsApp
  styles.css             sistema visual original (3 colores, Figtree)
  lib/                   formato de cifras y trazos del logo
  hooks/                 scroll, entrada en pantalla, contadores, reveal
  components/
    Nav, Hero, Stats, LitText, Finance, Calculator, WhoAndHow, Demo, Footer
    promises/            las 5 promesas con sus paneles del producto
    diagnostic/          motor de diagnóstico, ficha de la clienta y data por servicio
```

## Contacto

El WhatsApp está en `src/config.ts`. El formulario de demo abre WhatsApp con los datos ya escritos, y hay un botón flotante para escribir directo.
