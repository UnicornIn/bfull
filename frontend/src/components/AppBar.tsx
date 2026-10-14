import { BfIcon } from "./Brand";

/** Barra de pestañas de la réplica del producto. La primera pestaña va activa. */
export function AppBar({ tabs }: { tabs: string[] }) {
  return (
    <div className="app-bar">
      <span className="mini">
        <BfIcon />
      </span>
      {tabs.map((t, i) => (
        <span key={t} className={"tab" + (i === 0 ? " act" : "")}>
          {t}
        </span>
      ))}
    </div>
  );
}
