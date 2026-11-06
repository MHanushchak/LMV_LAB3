import { stores, type StoreId } from "../catalog/catalog.ts";
export const cities = [
  { id: "lviv", name: "Lviv", storeIds: ["atb", "silpo", "varus"] },
  { id: "kyiv", name: "Kyiv", storeIds: ["atb", "silpo"] },
  { id: "dnipro", name: "Dnipro", storeIds: ["atb", "varus"] },
] as const;
export type CityId = typeof cities[number]["id"];
export type Preferences = { version: 1; city: CityId; storeIds: StoreId[] };
export const PREFERENCES_KEY = "smartbasket.preferences.v1";
export function defaultPreferences(): Preferences { return { version: 1, city: "lviv", storeIds: stores.map(store => store.id) }; }
export function parsePreferences(raw: string): Preferences {
  const value = JSON.parse(raw) as Preferences;
  if (!value || value.version !== 1 || !cities.some(city => city.id === value.city) || !Array.isArray(value.storeIds) || value.storeIds.some(id => !stores.some(store => store.id === id)) || new Set(value.storeIds).size !== value.storeIds.length) throw new Error("Invalid preferences.");
  return value;
}
export function effectiveStores(preferences: Preferences): StoreId[] {
  const city = cities.find(city => city.id === preferences.city)!;
  return preferences.storeIds.filter(id => (city.storeIds as readonly string[]).includes(id));
}
