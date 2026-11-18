/** A tab-local sandbox. The ordinary localStorage dataset is never overwritten. */
export const DEMO_SESSION_KEY = "smartbasket.demo-session.v1";
export const scenarioIds = ["complete-basket", "missing-product", "search-validation", "first-set"] as const;
export type ScenarioId = typeof scenarioIds[number];
export type KeyValueStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;
export type DemoSession = { version: 1; scenarioId: ScenarioId; values: Record<string, string> };
export function readDemoSession(storage: KeyValueStorage): DemoSession | null {
  const raw = storage.getItem(DEMO_SESSION_KEY);
  if (raw === null) return null;
  const value = JSON.parse(raw) as DemoSession;
  if (!value || value.version !== 1 || !scenarioIds.includes(value.scenarioId) || !value.values || typeof value.values !== "object" || Array.isArray(value.values) || Object.values(value.values).some(v => typeof v !== "string")) throw new Error("Invalid scenario session.");
  return value;
}
/** Re-read on every operation; malformed sandbox data must never fall through to user data. */
export function scopedStorage(persistent: KeyValueStorage, session: KeyValueStorage): KeyValueStorage {
  return {
    getItem(key) { const sandbox = readDemoSession(session); return sandbox ? Object.hasOwn(sandbox.values, key) ? sandbox.values[key] : null : persistent.getItem(key); },
    setItem(key, value) {
      const sandbox = readDemoSession(session);
      if (sandbox) session.setItem(DEMO_SESSION_KEY, JSON.stringify({ ...sandbox, values: { ...sandbox.values, [key]: value } }));
      else persistent.setItem(key, value);
    },
    removeItem(key) {
      const sandbox = readDemoSession(session);
      if (sandbox) { const values = { ...sandbox.values }; delete values[key]; session.setItem(DEMO_SESSION_KEY, JSON.stringify({ ...sandbox, values })); }
      else persistent.removeItem(key);
    },
  };
}
