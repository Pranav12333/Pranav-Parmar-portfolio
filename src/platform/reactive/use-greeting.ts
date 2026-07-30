// src/platform/reactive/use-greeting.ts
import { useEffect, useState } from "react";

/** Hour boundaries and their greeting, evaluated in order. */
const GREETING_BANDS: readonly { until: number; label: string }[] = [
  { until: 12, label: "Good morning" },
  { until: 18, label: "Good afternoon" },
  { until: 24, label: "Good evening" },
];

/** Rendered before the client clock is read, so SSR/first paint never mismatch. */
const NEUTRAL_GREETING = "Hello";

/**
 * Time-aware greeting, computed after mount so it never mismatches
 * server/first paint. Shared by the preloader and hero.
 */
export function useGreeting(): string {
  const [greeting, setGreeting] = useState(NEUTRAL_GREETING);

  useEffect(() => {
    const hour = new Date().getHours();
    const band = GREETING_BANDS.find((b) => hour < b.until);
    setGreeting(band ? band.label : NEUTRAL_GREETING);
  }, []);

  return greeting;
}
