import { translate } from "../../i18n/messages.ts";
import type { SetItem, Unit } from "../sets/model.ts";

export const stores = [
  { id: "atb", name: "ATB" },
  { id: "silpo", name: "Silpo" },
  { id: "varus", name: "Varus" },
] as const;
export type StoreId = typeof stores[number]["id"];
export type Offer = { packPriceCents: number; available: boolean };
export type CatalogProduct = {
  id: string;
  name: string;
  unit: Unit;
  packQuantity: number;
  packLabel: string;
  group: string;
  referenceUnitPriceCents: number;
  offers: Record<StoreId, Offer>;
  legacyItemId?: string;
};
function offers(atb: number | null, silpo: number | null, varus: number | null): Record<StoreId, Offer> {
  const offer = (price: number | null): Offer => ({ packPriceCents: price ?? 0, available: price !== null });
  return { atb: offer(atb), silpo: offer(silpo), varus: offer(varus) };
}

/** Fixed demo fixtures, not retailer quotes. Prices are per whole retail pack. */
export const catalog: CatalogProduct[] = [
  { id: "rolled-oats", legacyItemId: "oats", name: "Rolled oats", unit: "kg", packQuantity: 0.5, packLabel: "500 g bag", group: "oats", referenceUnitPriceCents: 6000, offers: offers(2600, 3000, 2800) },
  { id: "milk", legacyItemId: "milk", name: "Milk", unit: "L", packQuantity: 1, packLabel: "1 L carton", group: "milk", referenceUnitPriceCents: 4500, offers: offers(null, 4500, 4300) },
  { id: "eggs", legacyItemId: "eggs", name: "Eggs", unit: "pcs", packQuantity: 10, packLabel: "10 eggs per carton", group: "eggs", referenceUnitPriceCents: 700, offers: offers(6500, 7000, 6800) },
  { id: "lactose-free-milk", name: "Lactose-free milk", unit: "L", packQuantity: 1, packLabel: "1 L carton", group: "milk", referenceUnitPriceCents: 5200, offers: offers(4800, 5200, 5000) },
  { id: "quick-oats", name: "Quick oats", unit: "kg", packQuantity: 0.5, packLabel: "500 g bag", group: "oats", referenceUnitPriceCents: 6400, offers: offers(2900, 3200, 3100) },
  { id: "chicken-breast", name: "Chicken breast", unit: "kg", packQuantity: 0.5, packLabel: "500 g tray", group: "chicken", referenceUnitPriceCents: 22000, offers: offers(9900, 11000, null) },
  { id: "rice", name: "Long-grain rice", unit: "kg", packQuantity: 1, packLabel: "1 kg bag", group: "rice", referenceUnitPriceCents: 6500, offers: offers(5900, 6500, 6200) },
  { id: "bananas", name: "Bananas", unit: "kg", packQuantity: 1, packLabel: "1 kg pack", group: "bananas", referenceUnitPriceCents: 7000, offers: offers(6400, 7000, 6800) },
  { id: "greek-yogurt", name: "Greek yogurt", unit: "kg", packQuantity: 0.3, packLabel: "300 g pot", group: "yogurt", referenceUnitPriceCents: 15000, offers: offers(3900, 4500, 4200) },
  { id: "buckwheat", name: "Buckwheat", unit: "kg", packQuantity: 0.8, packLabel: "800 g bag", group: "buckwheat", referenceUnitPriceCents: 8000, offers: offers(5600, 6400, 6000) },
  { id: "whole-wheat-bread", name: "Whole-wheat bread", unit: "pcs", packQuantity: 1, packLabel: "1 loaf · 500 g", group: "bread", referenceUnitPriceCents: 4200, offers: offers(3800, 4500, 4100) },
  { id: "potatoes", name: "Potatoes", unit: "kg", packQuantity: 1, packLabel: "1 kg pack", group: "potatoes", referenceUnitPriceCents: 3000, offers: offers(2700, 3200, 2900) },
  { id: "tomatoes", name: "Tomatoes", unit: "kg", packQuantity: 0.5, packLabel: "500 g tray", group: "tomatoes", referenceUnitPriceCents: 10000, offers: offers(4600, 5200, null) },
  { id: "cucumbers", name: "Cucumbers", unit: "kg", packQuantity: 0.5, packLabel: "500 g tray", group: "cucumbers", referenceUnitPriceCents: 8000, offers: offers(3700, null, 3900) },
  { id: "apples", name: "Apples", unit: "kg", packQuantity: 1, packLabel: "1 kg pack", group: "apples", referenceUnitPriceCents: 4500, offers: offers(3900, 4700, 4300) },
  { id: "pasta", name: "Durum wheat pasta", unit: "kg", packQuantity: 0.5, packLabel: "500 g bag", group: "pasta", referenceUnitPriceCents: 11000, offers: offers(4900, 5900, 5300) },
  { id: "sunflower-oil", name: "Sunflower oil", unit: "L", packQuantity: 1, packLabel: "1 L bottle", group: "oil", referenceUnitPriceCents: 7200, offers: offers(6500, 7600, 6900) },
  { id: "hard-cheese", name: "Hard cheese", unit: "kg", packQuantity: 0.2, packLabel: "200 g pack", group: "cheese", referenceUnitPriceCents: 40000, offers: offers(null, 8500, null) },
  { id: "butter", name: "Butter 82.5%", unit: "kg", packQuantity: 0.2, packLabel: "200 g pack", group: "butter", referenceUnitPriceCents: 50000, offers: offers(9200, null, 9800) },
  { id: "still-water", name: "Still water", unit: "L", packQuantity: 1.5, packLabel: "1.5 L bottle", group: "water", referenceUnitPriceCents: 1500, offers: offers(2100, 2400, 2250) },
  { id: "hake-fillet", name: "Frozen hake fillet", unit: "kg", packQuantity: 0.5, packLabel: "500 g frozen pack", group: "fish", referenceUnitPriceCents: 36000, offers: offers(null, 18900, 17500) },
  { id: "sugar", name: "Sugar", unit: "kg", packQuantity: 1, packLabel: "1 kg bag", group: "sugar", referenceUnitPriceCents: 3500, offers: offers(null, null, 3300) },
  { id: "ground-coffee", name: "Ground coffee", unit: "kg", packQuantity: 0.25, packLabel: "250 g pack", group: "coffee", referenceUnitPriceCents: 60000, offers: offers(13900, null, 14500) },
  { id: "dishwashing-liquid", name: "Dishwashing liquid", unit: "L", packQuantity: 0.5, packLabel: "500 ml bottle", group: "household", referenceUnitPriceCents: 10000, offers: offers(4500, 5500, null) },
];
export function findProduct(id: string | null | undefined) {
  return catalog.find(product => product.id === id);
}
export function productForItem(item: SetItem): CatalogProduct | undefined {
  const product = item.catalogId === undefined
    // Support the exact original starter records, without guessing arbitrary names.
    ? catalog.find(product => product.legacyItemId === item.id && product.name === item.name)
    : findProduct(item.catalogId);
  return product?.unit === item.unit ? product : undefined;
}
export function searchCatalog(query: string, store: StoreId | "all" = "all") {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const units = new Set(["g", "г", "kg", "кг", "l", "л", "ml", "мл", "pcs", "шт"]);
  return catalog.filter(product => {
    const text = `${product.name} ${product.packLabel} ${product.unit} ${translate("uk", product.name)} ${translate("uk", product.packLabel)} ${translate("uk", product.unit)}`.toLocaleLowerCase();
    const tokens = text.split(/[^\p{L}\p{N}]+/u);
    return words.every(word => units.has(word) ? tokens.includes(word) : text.includes(word)) && (store === "all" || product.offers[store].available);
  });
}
export function alternatives(item: SetItem, store: StoreId) {
  const original = productForItem(item);
  if (!original) return [];
  return catalog.filter(product => product.id !== original.id && product.group === original.group && product.unit === item.unit && product.offers[store].available);
}
