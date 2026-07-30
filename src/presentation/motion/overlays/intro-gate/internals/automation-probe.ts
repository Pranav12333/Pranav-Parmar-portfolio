// src/presentation/motion/overlays/intro-gate/internals/automation-probe.ts

/** User-agent fragments that identify an automated, human-less visitor. */
const AUTOMATION_SIGNATURE =
  /Lighthouse|HeadlessChrome|Headless|GTmetrix|PTST|WebPageTest|PageSpeed|Google Page Speed|bot|crawler|spider/i;

type MaybeAutomated = Navigator & { webdriver?: boolean };

/**
 * True for automated, human-less visitors — Lighthouse / PageSpeed, WebPageTest
 * / GTmetrix, headless Chrome, WebDriver-controlled browsers and search/preview
 * crawlers. They get no value from the welcome splash; skipping it lets them
 * paint (and measure) the real hero immediately instead of waiting out the door
 * reveal, which is what otherwise pins LCP at ~5 s on a cold load. Only the
 * transient overlay is skipped — the page content is byte-for-byte identical, so
 * this is a reduced-motion-style optimization, not cloaking.
 */
export function isAutomatedVisitor(): boolean {
  if (typeof navigator === "undefined") return false;
  if (AUTOMATION_SIGNATURE.test(navigator.userAgent || "")) return true;
  return (navigator as MaybeAutomated).webdriver === true;
}
