"use client";

import { createLocalStore } from "@/src/lib/local-store";
import { CART_KEY, parseCart, type DemoCart } from "./model";

const store = createLocalStore<DemoCart | null>(CART_KEY, null, parseCart);
export const useCart = store.useStore;
export const updateCart = store.update;
export const saveCart = store.save;
export const retryCart = store.retry;
