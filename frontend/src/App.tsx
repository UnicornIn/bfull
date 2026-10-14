import { useReveal } from "./hooks/useReveal";
import { BfIconSprite } from "./components/Brand";
import { Calculator } from "./components/Calculator";
import { Demo } from "./components/Demo";
import { Diagnostic } from "./components/diagnostic/Diagnostic";
import { Finance } from "./components/Finance";
import { Footer, WhatsAppFloat } from "./components/Footer";
import { Hero } from "./components/Hero";
import { LitText } from "./components/LitText";
import { Nav } from "./components/Nav";
import { Promises } from "./components/promises/Promises";
import { Stats } from "./components/Stats";
import { How, Who } from "./components/WhoAndHow";

export default function App() {
  useReveal();
  return (
    <>
      <BfIconSprite />
      <Nav />
      <main id="top">
        <Hero />
        <Stats />
        <LitText />
        <Promises />
        <Finance />
        <Diagnostic />
        <Calculator />
        <Who />
        <How />
        <Demo />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
