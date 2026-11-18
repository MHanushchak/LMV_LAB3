"use client";

import { useLocale } from "@/src/i18n/locale";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CircleAlert, X } from "lucide-react";
import { Button, ErrorState } from "@/src/components/ui";
import { fieldStyles } from "@/src/components/ui/styles";
import { alternatives, type StoreId } from "../catalog/catalog";
import { type MealSet } from "../sets/model";
import { retryCart, saveCart, useCart } from "../cart/store";
import { effectiveStores } from "../settings/model";
import { usePreferences } from "../settings/store";
import { BasketLines } from "./basket-lines";
import { buildBasket, type Choices } from "./model";

type Props = { source: MealSet; storeId: StoreId; onClose: () => void };
export function BasketDialog({ source, storeId, onClose }: Props) {
  const { t, money, itemName, productName } = useLocale();
  const [choices, setChoices] = useState<Choices>({});
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const router = useRouter();
  const cart = useCart();
  const preferences = usePreferences();
  const storeEligible = preferences.loaded && !preferences.error && effectiveStores(preferences.value).includes(storeId);
  const original = buildBasket(source, storeId);
  const basket = buildBasket(source, storeId, choices);
  const unresolved = original.lines.filter(line => line.status === "missing");
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog?.showModal();
    dialog?.querySelector<HTMLElement>("[data-dialog-title]")?.focus();
    return () => {
      dialog?.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);
  function confirm() {
    if (!storeEligible || basket.missingCount || !basket.availableCount) return;
    if (saveCart({ version: 1, id: crypto.randomUUID(), city: preferences.value.city, source, storeId, choices })) {
      onClose();
      router.push("/cart");
    }
  }
  return (
    <dialog ref={dialogRef} aria-labelledby={titleId} aria-describedby={descriptionId} onCancel={event => { event.preventDefault(); onClose(); }} className="device-dialog rounded-2xl border border-neutral-300 bg-white p-0 text-neutral-900 shadow-xl">
      <section className="flex min-w-0 flex-col gap-4 p-4">
        <header className="flex items-start justify-between gap-2">
          <h2 id={titleId} data-dialog-title tabIndex={-1} className="min-w-0 break-words text-h4">{t("Review {store} basket", { store: basket.storeName })}</h2>
          <Button variant="text" aria-label={t("Close basket review")} onClick={onClose}><X className="h-6 w-6" aria-hidden="true" /></Button>
        </header>
        <p id={descriptionId} className="text-body-sm text-neutral-600">{t("Basket for {name}.", { name: source.name })}</p>
        {!!unresolved.length && <>
          <p className="flex items-start gap-2 text-body-sm text-status-error"><CircleAlert className="h-6 w-6 shrink-0" aria-hidden="true" />{t("Resolve each missing item. Substitutions may have different ingredients; review the product name before choosing.")}</p>
          {unresolved.map(line => {
            const selectId = `${titleId}-${line.item.id}`;
            return <div key={line.item.id} className="flex min-w-0 flex-col gap-2">
              <label htmlFor={selectId} className="break-words text-h6">{t("Resolve {name}", { name: itemName(line.item) })}</label>
              <select id={selectId} value={choices[line.item.id] ?? ""} onChange={event => setChoices(current => ({ ...current, [line.item.id]: event.target.value }))} className={fieldStyles}>
                <option value="">{t("Choose an action")}</option>
                {alternatives(line.item, storeId).map(product => <option key={product.id} value={product.id}>{t("Use {name}", { name: productName(product) })}</option>)}
                <option value="exclude">{t("Exclude this item")}</option>
              </select>
            </div>;
          })}
        </>}
        <div role="status" className="flex flex-col gap-2 rounded-[10px] bg-primary-100 p-3">
          <p className="text-body-sm">{t("{missing} unresolved · {excluded} excluded", { missing: basket.missingCount, excluded: basket.excludedCount })}</p>
          <p className="text-body-sm">{basket.missingCount ? t("Available items subtotal") : basket.excludedCount ? t("Adjusted basket total") : t("Basket total")}</p>
          <output aria-label={t("Review basket total")} className="text-h3">{money(basket.totalCents)}</output>
        </div>
        <BasketLines lines={basket.lines} />
        {!storeEligible && <p role="alert" className="text-body-sm text-status-error">{t("Store preferences changed. Return to comparison and choose an available store.")}</p>}
        {cart.error && <ErrorState description={cart.error} onRetry={retryCart} />}
        <Button disabled={!storeEligible || !cart.loaded || !!cart.error || basket.missingCount > 0 || basket.availableCount === 0} onClick={confirm}>{t("Confirm basket")}</Button>
        {!basket.availableCount && !basket.missingCount && <p className="text-body-sm text-status-error">{t("Keep at least one available item to continue.")}</p>}
        <Button variant="text" onClick={onClose}>{t("Back to comparison")}</Button>
      </section>
    </dialog>
  );
}
