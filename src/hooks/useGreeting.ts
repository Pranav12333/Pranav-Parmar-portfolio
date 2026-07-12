import { useEffect, useState } from "react";

/**
 * Time-aware greeting, computed after mount so it never mismatches
 * server/first paint. Shared by the preloader and hero.
 */
export function useGreeting(): string {
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(
      hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"
    );
  }, []);

  return greeting;
}
