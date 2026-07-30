// src/runtime/composition/document-flow.tsx
import Capabilities from "@surfaces/capabilities";
import Chronology from "@surfaces/chronology";
import Footer from "@surfaces/chrome/footer";
import Hero from "@surfaces/hero";
import Outreach from "@surfaces/outreach";
import Profile from "@surfaces/profile";
import Showcase from "@surfaces/showcase";

/** The skip-link target; also what the "Skip to main content" anchor focuses. */
export const MAIN_ID = "main-content";

/**
 * The document structure, in reading order. Section anchors are owned by
 * each surface (from the section registry), so this file only decides sequence.
 */
const DocumentFlow = () => (
  <div className="relative z-10">
    <main id={MAIN_ID} tabIndex={-1}>
      <Hero />
      <Profile />
      <Capabilities />
      <Chronology />
      <Showcase />
      <Outreach />
    </main>
    <Footer />
  </div>
);

export default DocumentFlow;
