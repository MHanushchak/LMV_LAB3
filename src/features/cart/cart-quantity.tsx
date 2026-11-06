"use client";

import { Button, Input } from "@/src/components/ui";
import { useLocale } from "@/src/i18n/locale";
import { putQuantity, useDrafts } from "../drafts/store";
import type { BasketLine } from "../compare/model";
import { cartIdentity, changeCartQuantity, parseQuantity, type DemoCart } from "./model";
import { updateCart, useCart } from "./store";

export function CartQuantity({ cart, line }: { cart: DemoCart; line: BasketLine }) {
  const { t, itemName, productName } = useLocale();
  const drafts = useDrafts();
  const savedCart = useCart();
  const identity = cartIdentity(cart);
  const key = `cart:${identity}:${line.item.id}`;
  const raw = drafts.value.quantities[key] ?? String(line.item.quantity);
  const quantity = parseQuantity(raw);
  const name = line.product ? productName(line.product) : itemName(line.item);
  function apply(value: number) {
    return updateCart(current => {
      if (!current || cartIdentity(current) !== identity) throw new Error("Cart changed.");
      return changeCartQuantity(current, line.item.id, value);
    });
  }
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <Input label={t("Quantity for {name}", { name })} inputMode="decimal" value={raw} disabled={!drafts.loaded || !!savedCart.error} onChange={event => {
        const value = event.target.value;
        putQuantity(key, value);
        const parsed = parseQuantity(value);
        if (parsed !== null) apply(parsed);
      }} onBlur={() => { if (quantity !== null && quantity === line.item.quantity) putQuantity(key, null); }} error={quantity === null ? t("Enter a quantity above 0, up to 1,000,000, with at most 3 decimal places.") : undefined} helperText={t("Quantity in {unit}. Valid changes save automatically.", { unit: t(line.item.unit) })} />
      {quantity !== null && quantity !== line.item.quantity && <Button variant="secondary" disabled={!!savedCart.error} onClick={() => apply(quantity)}>{t("Apply quantity")}</Button>}
    </div>
  );
}
