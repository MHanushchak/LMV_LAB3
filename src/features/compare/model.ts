import { alternatives, findProduct, productForItem, stores, type CatalogProduct, type StoreId } from "../catalog/catalog.ts";
import { validQuantity, type MealSet, type SetItem } from "../sets/model.ts";

export type Choices = Record<string, string>;
export type BasketLine = {
  item: SetItem;
  product?: CatalogProduct;
  status: "available" | "missing" | "excluded";
  reason?: string;
  substituted: boolean;
  sharedPacks?: boolean;
  packs: number;
  suppliedQuantity: number;
  totalCents: number;
};
export type StoreBasket = {
  storeId: StoreId;
  storeName: string;
  lines: BasketLine[];
  totalCents: number;
  missingCount: number;
  excludedCount: number;
  availableCount: number;
  complete: boolean;
  bestValue: boolean;
};
export function buildBasket(set: MealSet, storeId: StoreId, choices: Choices = {}): StoreBasket {
  const lines: BasketLine[] = set.items.map(item => {
    let product = productForItem(item);
    let substituted = false;
    const base: BasketLine = { item, product, status: "missing", substituted, packs: 0, suppliedQuantity: 0, totalCents: 0 };
    if (!validQuantity(item.quantity)) return { ...base, reason: "Invalid quantity" };
    if (!product?.offers[storeId].available) {
      if (choices[item.id] === "exclude") return { ...base, status: "excluded" };
      const replacement = alternatives(item, storeId).find(candidate => candidate.id === choices[item.id]);
      if (replacement) { product = replacement; substituted = true; }
      else return { ...base, reason: product ? "Out of stock" : "Not mapped to the catalog" };
    }
    // Round up to whole packs using integer thousandths, avoiding decimal drift.
    const packs = Math.ceil(Math.round(item.quantity * 1000) / Math.round(product.packQuantity * 1000));
    return { item, product, status: "available", substituted, packs, suppliedQuantity: Math.round(packs * product.packQuantity * 1000) / 1000, totalCents: packs * product.offers[storeId].packPriceCents };
  });
  // Multiple template rows (including substitutions) may resolve to the same SKU.
  // Buy shared packs once, rather than rounding each row up independently.
  const groups = new Map<string, BasketLine[]>();
  for (const line of lines) {
    if (line.status === "available" && line.product) {
      const group = groups.get(line.product.id) ?? [];
      group.push(line);
      groups.set(line.product.id, group);
    }
  }
  for (const group of groups.values()) {
    if (group.length < 2) continue;
    const product = group[0].product!;
    const requestedMilli = group.reduce((sum, line) => sum + Math.round(line.item.quantity * 1000), 0);
    const packMilli = Math.round(product.packQuantity * 1000);
    const packs = Math.ceil(requestedMilli / packMilli);
    group.forEach((line, index) => {
      line.sharedPacks = true;
      line.packs = index === 0 ? packs : 0;
      line.totalCents = index === 0 ? packs * product.offers[storeId].packPriceCents : 0;
      line.suppliedQuantity = line.item.quantity + (index === group.length - 1 ? (packs * packMilli - requestedMilli) / 1000 : 0);
      line.suppliedQuantity = Math.round(line.suppliedQuantity * 1000) / 1000;
    });
  }
  const missingCount = lines.filter(line => line.status === "missing").length;
  const excludedCount = lines.filter(line => line.status === "excluded").length;
  return {
    storeId, storeName: stores.find(store => store.id === storeId)!.name, lines,
    totalCents: lines.reduce((sum, line) => sum + line.totalCents, 0), missingCount, excludedCount,
    availableCount: lines.filter(line => line.status === "available").length,
    complete: lines.length > 0 && missingCount === 0 && excludedCount === 0,
    bestValue: false,
  };
}
export function compareStores(set: MealSet, storeIds: readonly StoreId[] = stores.map(store => store.id)) {
  const baskets = stores.filter(store => storeIds.includes(store.id)).map(store => buildBasket(set, store.id));
  const complete = baskets.filter(basket => basket.complete);
  const cheapest = complete.length ? Math.min(...complete.map(basket => basket.totalCents)) : null;
  return baskets.map(basket => ({ ...basket, bestValue: basket.complete && basket.totalCents === cheapest })).sort((a, b) => Number(b.complete) - Number(a.complete) || a.totalCents - b.totalCents || a.storeName.localeCompare(b.storeName));
}
export function validateChoices(set: MealSet, storeId: StoreId, value: unknown): value is Choices {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.entries(value).every(([id, choice]) => {
    const item = set.items.find(item => item.id === id);
    if (!item || typeof choice !== "string") return false;
    return choice === "exclude" || !!findProduct(choice) && alternatives(item, storeId).some(product => product.id === choice);
  });
}
