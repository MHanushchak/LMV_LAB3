import { stores, type StoreId } from "../catalog/catalog.ts";
import { buildBasket, validateChoices, type Choices } from "../compare/model.ts";
import { cities, type CityId } from "../settings/model.ts";
import { parseData, validQuantity, type MealSet } from "../sets/model.ts";

export const CART_KEY = "smartbasket.demo-cart.v1";
export type DemoCart = { version: 1; id?: string; city?: CityId; originalSource?: MealSet; source: MealSet; storeId: StoreId; choices: Choices };
export function parseCart(raw: string): DemoCart | null {
  const value: unknown = JSON.parse(raw);
  if (value === null) return null;
  if (!value || typeof value !== "object" || !("version" in value) || value.version !== 1 || !("source" in value) || !("storeId" in value) || !("choices" in value)) throw new Error("Invalid cart.");
  const source = parseData(JSON.stringify({ version: 1, sets: [value.source], pending: [] })).sets[0];
  if (!stores.some(store => store.id === value.storeId) || !validateChoices(source, value.storeId as StoreId, value.choices)) throw new Error("Invalid store choices.");
  const basket = buildBasket(source, value.storeId as StoreId, value.choices);
  if (basket.missingCount || !basket.availableCount) throw new Error("Unresolved basket.");
  const optional = value as Partial<DemoCart>;
  if (optional.id !== undefined && (typeof optional.id !== "string" || !optional.id || optional.id.length > 120)) throw new Error("Invalid cart ID.");
  if (optional.city !== undefined && !cities.some(city => city.id === optional.city)) throw new Error("Invalid cart city.");
  let originalSource: MealSet | undefined;
  if (optional.originalSource !== undefined) {
    originalSource = parseData(JSON.stringify({ version: 1, sets: [optional.originalSource], pending: [] })).sets[0];
    if (originalSource.id !== source.id) throw new Error("Invalid source snapshot.");
  }
  return { version: 1, source, storeId: value.storeId as StoreId, choices: value.choices, ...(optional.id !== undefined ? { id: optional.id } : {}), ...(optional.city !== undefined ? { city: optional.city } : {}), ...(originalSource ? { originalSource } : {}) };
}
export function cartIdentity(cart: DemoCart) { return cart.id ?? `${cart.source.id}:${cart.storeId}`; }
export function parseQuantity(raw: string): number | null {
  const normalized = raw.trim().replace(",", ".");
  if (!/^\d+(?:\.\d{0,3})?$/.test(normalized)) return null;
  const quantity = Number(normalized);
  return validQuantity(quantity) ? quantity : null;
}
export function changeCartQuantity(cart: DemoCart, itemId: string, quantity: number): DemoCart {
  if (!validQuantity(quantity) || !buildBasket(cart.source, cart.storeId, cart.choices).lines.some(line => line.item.id === itemId && line.status === "available")) throw new Error("Invalid cart quantity.");
  return { ...cart, originalSource: cart.originalSource ?? cart.source, source: { ...cart.source, items: cart.source.items.map(item => item.id === itemId ? { ...item, quantity } : item) } };
}
