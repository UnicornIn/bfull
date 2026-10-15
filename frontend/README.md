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

El WhatsApp está en `src/config.ts`. Al enviar el formulario de demo pasan dos cosas: la solicitud se guarda como una fila en Google Sheets y se abre WhatsApp con los datos ya escritos. Además hay un botón flotante para escribir directo.

## Guardar solicitudes en Google Sheets

Se configura una sola vez y no tiene costo:

1. Crea una hoja de cálculo en tu Drive, por ejemplo "bfull · Solicitudes de demo".
2. En la hoja, abre **Extensiones → Apps Script**. Borra lo que aparece y pega el contenido de [`google-apps-script/leads.gs`](google-apps-script/leads.gs). Guarda.
3. Haz clic en **Implementar → Nueva implementación**. En el tipo, elige **Aplicación web** y configúrala así:
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
4. Autoriza el acceso cuando Google lo pida y copia la URL que termina en `/exec`.
5. Pega esa URL en la variable `VITE_LEADS_URL`:
   - En local: crea `frontend/.env.local` con `VITE_LEADS_URL=https://script.google.com/macros/s/.../exec` y reinicia `npm run dev`.
   - En el hosting (Vercel, Netlify…): agrégala en las variables de entorno del proyecto y vuelve a desplegar.

La primera solicitud crea la pestaña **Leads** con sus encabezados. Si `VITE_LEADS_URL` no está configurada, el formulario sigue abriendo WhatsApp pero no guarda nada.

Si más adelante cambias `leads.gs`, publícalo desde **Implementar → Administrar implementaciones → Editar → Nueva versión**. Así la URL no cambia.
