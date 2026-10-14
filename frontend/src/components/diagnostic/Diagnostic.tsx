import { useState } from "react";
import type { CatKey } from "./data";
import { Ficha } from "./Ficha";
import { Motor } from "./Motor";
import { ServiceData } from "./ServiceData";

/** Motor de diagnóstico + ficha + data por servicio comparten la categoría elegida. */
export function Diagnostic() {
  const [cat, setCat] = useState<CatKey>("cabello");
  return (
    <>
      <Motor cat={cat} onCat={setCat} />
      <Ficha cat={cat} />
      <ServiceData cat={cat} />
    </>
  );
}
