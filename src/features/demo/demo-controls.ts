"use client";

import { createScenarioSession, scenarios } from "./scenarios";
import { DEMO_SESSION_KEY, type ScenarioId } from "./sandbox";

export function startScenario(id: ScenarioId) {
  const scenario = scenarios.find(s => s.id === id);
  if (!scenario) throw new Error("Unknown scenario.");
  window.sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(createScenarioSession(id)));
  // A full navigation resets all in-memory React stores into the selected scope.
  window.location.assign(scenario.href);
}
export function exitScenario() {
  window.sessionStorage.removeItem(DEMO_SESSION_KEY);
  // A client transition would keep sandbox snapshots alive in the ordinary app.
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- Full reload is required to reset all singleton stores.
  window.location.assign("/demo");
}
