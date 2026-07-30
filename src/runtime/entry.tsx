// src/runtime/entry.tsx
//
// The single browser entry point, referenced by the module script in index.html.
// It does nothing but mount — every decision lives a layer down.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import MotionProviders from "./bootstrap/providers";
import AppShell from "./composition/shell";

/** The mount point declared in index.html. */
const ROOT_ID = "root";

const host = document.getElementById(ROOT_ID);
if (host) {
  createRoot(host).render(
    <StrictMode>
      <MotionProviders>
        <AppShell />
      </MotionProviders>
    </StrictMode>
  );
}
