import type { CSSProperties } from "react";
import { B_PATH, WORDMARK_PATH } from "../lib/brand";

/** Símbolo SVG reutilizable (<use href="#bficon">). Se monta una vez en App. */
export function BfIconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="bficon" viewBox="0 0 100 100">
        <rect width="100" height="100" rx="23" fill="currentColor" />
        <g transform="translate(29.39 63.95) scale(0.62)">
          <path fill="#fff" d={B_PATH} />
        </g>
        <rect x="34.12" y="71.39" width="25" height="8.06" rx="4.03" fill="#fff" />
      </symbol>
    </svg>
  );
}

export function BfIcon({ style }: { style?: CSSProperties }) {
  return (
    <svg className="icon" viewBox="0 0 100 100" role="img" aria-label="bfull" style={style}>
      <use href="#bficon" />
    </svg>
  );
}

export function Logo({ label = "bfull, inicio" }: { label?: string }) {
  return (
    <a className="logo" href="#top" aria-label={label}>
      <svg className="wm" viewBox="7.63 -70 189.29 95" role="img" aria-label="bfull">
        <path fill="#16141B" d={WORDMARK_PATH} />
        <rect className="bar" fill="#3D0A78" x="7.63" y="12" width="189.29" height="13" rx="6.5" />
      </svg>
    </a>
  );
}

export function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.39 9.39 0 0 1-1.44-5.01c0-5.19 4.23-9.42 9.43-9.42 2.52 0 4.88.98 6.66 2.76a9.36 9.36 0 0 1 2.76 6.67c0 5.2-4.23 9.42-9.43 9.42m8.02-17.45A11.27 11.27 0 0 0 12.05.73C5.8.73.71 5.82.71 12.07c0 2 .52 3.95 1.52 5.67L.62 23.62l6.02-1.58a11.32 11.32 0 0 0 5.41 1.38h.01c6.25 0 11.34-5.09 11.34-11.34 0-3.03-1.18-5.88-3.33-8.03" />
    </svg>
  );
}
