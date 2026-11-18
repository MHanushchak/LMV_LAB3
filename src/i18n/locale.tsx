"use client";

import { appStorage } from "@/src/lib/app-storage";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { productForItem, type CatalogProduct } from "@/src/features/catalog/catalog";
import type { SetItem } from "@/src/features/sets/model";
import { translate, type Locale } from "./messages";

export const LOCALE_KEY = "smartbasket.locale.v1";
const initial = { locale: "en" as Locale, error: false };
let snapshot = initial;
let initialized = false;
const listeners = new Set<() => void>();
function emit() { listeners.forEach(listener => listener()); }
function read() {
  try { snapshot = { locale: appStorage().getItem(LOCALE_KEY) === "uk" ? "uk" : "en", error: false }; }
  catch { snapshot = { ...snapshot, error: true }; }
  emit();
}
function onStorage(event: StorageEvent) { if (event.key === LOCALE_KEY || event.key === null) read(); }
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!initialized) { initialized = true; read(); }
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => { listeners.delete(listener); if (!listeners.size) window.removeEventListener("storage", onStorage); };
}
export function setLocale(locale: Locale) {
  let error = false;
  try { appStorage().setItem(LOCALE_KEY, locale); } catch { error = true; }
  snapshot = { locale, error };
  emit();
}
export function useLocale() {
  const { locale, error } = useSyncExternalStore(subscribe, () => snapshot, () => initial);
  const t = (message: string, values?: Record<string, string | number>) => translate(locale, message, values);
  return {
    locale, error, t, setLocale,
    money: (cents: number) => new Intl.NumberFormat(locale === "uk" ? "uk-UA" : "en-UA", { style: "currency", currency: "UAH" }).format(cents / 100),
    number: (value: number) => new Intl.NumberFormat(locale === "uk" ? "uk-UA" : "en-UA", { maximumFractionDigits: 3 }).format(value),
    productName: (product: CatalogProduct) => t(product.name),
    itemName: (item: SetItem) => { const product = productForItem(item); return product ? t(product.name) : item.name; },
  };
}
export function LocaleEffects() {
  const { locale } = useLocale();
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.lang = locale;
    const titles: Record<string, string> = { "/sets": "My Sets", "/compare": "Where Cheaper", "/cart": "Cart", "/settings": "Settings", "/demo": "Demo scenarios", "/credits": "Image credits" };
    const title = pathname.startsWith("/sets/") ? "Set details" : titles[pathname];
    document.title = title ? `${translate(locale, title)} | SmartBasket` : "SmartBasket";
    document.querySelector('meta[name="description"]')?.setAttribute("content", translate(locale, "Save your meal sets, compare grocery baskets, and shop with confidence."));
  }, [locale, pathname]);
  return null;
}
