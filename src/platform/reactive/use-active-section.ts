// src/platform/reactive/use-active-section.ts
import { useEffect, useState } from "react";
import { ACTIVE_SECTION_OBSERVER } from "@kernel";

/**
 * Tracks which section is currently in view using IntersectionObserver.
 * Returns the id of the most prominent section.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) {
        setActive(visible[0].target.id);
      }
    }, ACTIVE_SECTION_OBSERVER);

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
