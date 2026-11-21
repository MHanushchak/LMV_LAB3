"use client";

import { toast } from "../notifications/store";
import { createLocalStore } from "@/src/lib/local-store";
import { CART_KEY, parseCart, type DemoCart } from "./model";

const store = createLocalStore<DemoCart | null>(CART_KEY, null, parseCart);
export const useCart = store.useStore;
export function updateCart(updater: Parameters<typeof store.update>[0]) {
  const saved = store.update(updater);
  if (saved) toast.success("Quantity updated.", { id: "cart-quantity" });
  return saved;
}
export function saveCart(value: DemoCart) {
  const saved = store.save(value);
  if (saved) toast.success("Basket confirmed.", { id: "cart-saved" });
  return saved;
}
export const retryCart = store.retry;
