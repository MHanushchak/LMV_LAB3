"use client";

import { useLocale } from "@/src/i18n/locale";

import { useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import { CircleAlert, Store } from "lucide-react";
import { Button, EmptyState, ErrorState, StatusBadge } from "@/src/components/ui";
import { fieldStyles, panelStyles, type UIState } from "@/src/components/ui/styles";
import { Loading } from "@/components/layout/screen-states";
import { type MealSet } from "@/src/features/sets/model";
import { retryStorage, useSets } from "@/src/features/sets/store";
import type { StoreId } from "../catalog/catalog";
import { compareStores } from "./model";
import { BasketDialog } from "./basket-dialog";
import { cities, effectiveStores } from "../settings/model";
import { usePreferences, retryPreferences } from "../settings/store";
import { BasketLines } from "./basket-lines";

export function ComparePage({ state = "Default" }: { state?: UIState }) {
  const { t, money, itemName } = useLocale();
  const { data, loaded, error } = useSets();
  const preferences = usePreferences();
  const search = useSearchParams();
  const [setId, setSetId] = useState("");
  const [review, setReview] = useState<{ source: MealSet; storeId: StoreId } | null>(null);
  const selectId = useId();
  const selected = data.sets.find(set => set.id === (setId || search.get("set"))) ?? data.sets[0];
  if (!loaded || !preferences.loaded || state === "Loading") return <Loading />;
  const problem = state === "Error" ? "Your saved sets could not be loaded." : error;
  const empty = !data.sets.length || state === "Empty";
  const storeIds = effectiveStores(preferences.value);
  const baskets = selected ? compareStores(selected, storeIds) : [];
  const recommended = baskets.find(basket => basket.bestValue);
  const nextComplete = baskets.find(basket => basket.complete && basket.totalCents > (recommended?.totalCents ?? 0));
  return (
    <section className="flex min-w-0 flex-col gap-4" aria-labelledby="compare-title">
      <header className="flex flex-col gap-2"><h1 id="compare-title" className="text-h1">{t("Where Cheaper")}</h1></header>
      {preferences.error && <ErrorState description={preferences.error} onRetry={retryPreferences} />}
      <p className="text-body-sm text-neutral-600">{t("City")}: {t(cities.find(city => city.id === preferences.value.city)!.name)}</p>
      {problem ? <ErrorState description={problem} onRetry={retryStorage} /> : empty ? (
        <EmptyState title={t("Start with a saved set")} description={t("Create a meal template before comparing basket prices across stores.")} action={{ label: t("Create a Set"), href: "/sets" }} />
      ) : <>
        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor={selectId} className="text-h6">{t("Choose a set")}</label>
          <select id={selectId} value={selected.id} onChange={event => setSetId(event.target.value)} disabled={state === "Disabled"} className={fieldStyles}>{data.sets.map(set => <option key={set.id} value={set.id}>{set.name}</option>)}</select>
        </div>
        {!storeIds.length ? <EmptyState title={t("No stores selected")} description={t("Choose a city and at least one store in Settings.")} action={{ label: t("Settings"), href: "/settings" }} /> : !selected.items.length ? <EmptyState title={t("This set has no items")} description={t("Add products to your set before comparing stores.")} action={{ label: t("Add Items in My Sets"), href: `/sets/${encodeURIComponent(selected.id)}` }} /> : <>
          {!baskets.some(basket => basket.complete) && <p className="flex items-start gap-2 text-body-sm text-status-warning"><CircleAlert className="h-6 w-6 shrink-0" aria-hidden="true" />{t("No store has the full set. Resolve missing items before continuing.")}</p>}
          {recommended && <aside role="status" className="flex flex-col gap-1 rounded-2xl border border-secondary-700 bg-white p-4">
            <p className="text-h6 text-secondary-700">{t("{store}: full set for {price}", { store: recommended.storeName, price: money(recommended.totalCents) })}</p>
            <p className="text-body-sm text-neutral-600">{nextComplete ? t("Save {amount} compared with {store}.", { amount: money(nextComplete.totalCents - recommended.totalCents), store: nextComplete.storeName }) : t("All requested items are available.")}</p>
          </aside>}
          <div className="flex min-w-0 flex-col gap-3">
          {baskets.map(basket => <article key={basket.storeId} className={`${panelStyles} ${basket.bestValue ? "border-secondary-700" : ""}`} aria-label={t("{store} comparison", { store: basket.storeName })}>
            <div className="flex flex-wrap items-center gap-2"><Store className="h-6 w-6 text-primary-700" strokeWidth={2} aria-hidden="true" /><h2 className="text-h4">{basket.storeName}</h2>{basket.bestValue && <StatusBadge status="best-value" />}</div>
            <p className="text-body-sm text-neutral-600">{basket.complete ? t("Basket total") : t("Available items subtotal")}</p>
            <output aria-label={t("{store} basket total", { store: basket.storeName })} className="text-h3">{money(basket.totalCents)}</output>
            {!basket.complete && <p className="text-body-sm font-semibold text-status-warning">{t("Partial basket · {available} of {count} items", { available: basket.availableCount, count: selected.items.length })}</p>}
            {basket.complete && <p className="text-body-sm">{t("{available} of {count} items available", { available: basket.availableCount, count: selected.items.length })}</p>}
            {!!basket.missingCount && <div className="flex flex-col gap-2 text-body-sm text-status-error">
              <p className="flex items-start gap-2"><CircleAlert className="h-6 w-6 shrink-0" aria-hidden="true" />{t(basket.missingCount === 1 ? "{count} item missing" : "{count} items missing", { count: basket.missingCount })}</p>
              <ul className="flex flex-col gap-1">{basket.lines.filter(line => line.status === "missing").map(line => <li key={line.item.id} className="break-words">{itemName(line.item)} · {t(line.reason ?? "")}</li>)}</ul>
            </div>}
            <details className="flex min-w-0 flex-col"><summary className="min-h-11 cursor-pointer select-none py-3 text-body-sm font-semibold text-primary-700">{t("Item and pack breakdown")}</summary><BasketLines lines={basket.lines} /></details>
            <Button disabled={state === "Disabled" || !!preferences.error} aria-label={basket.missingCount ? t("Resolve missing items at {store}", { store: basket.storeName }) : t("Review basket at {store}", { store: basket.storeName })} onClick={() => setReview({ source: selected, storeId: basket.storeId })}>{basket.missingCount ? t("Resolve missing items") : t("Review basket")}</Button>
          </article>)}
          </div>
        </>}
      </>}
      {review && <BasketDialog source={review.source} storeId={review.storeId} onClose={() => setReview(null)} />}
    </section>
  );
}
export const ComparePageStates = {
  Default: ComparePage,
  Loading: () => <ComparePage state="Loading" />,
  Error: () => <ComparePage state="Error" />,
  Empty: () => <ComparePage state="Empty" />,
  Disabled: () => <ComparePage state="Disabled" />,
};
