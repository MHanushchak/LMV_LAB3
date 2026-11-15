"use client";

import { useLocale } from "@/src/i18n/locale";

import { CircleAlert, ShoppingCart } from "lucide-react";
import { ButtonLink, EmptyState, ErrorState } from "@/src/components/ui";
import { panelStyles } from "@/src/components/ui/styles";
import { Loading } from "@/components/layout/screen-states";
import { BasketLines } from "../compare/basket-lines";
import { buildBasket } from "../compare/model";
import { useSets } from "../sets/store";
import { cities, effectiveStores } from "../settings/model";
import { usePreferences } from "../settings/store";
import { useDrafts, retryDrafts } from "../drafts/store";
import { cartIdentity } from "./model";
import { CartQuantity } from "./cart-quantity";
import { retryCart, useCart } from "./store";

export function CartPage() {
  const { t, money } = useLocale();
  const cart = useCart();
  const sets = useSets();
  const drafts = useDrafts();
  const preferences = usePreferences();
  if (!cart.loaded) return <Loading />;
  const basket = cart.value ? buildBasket(cart.value.source, cart.value.storeId, cart.value.choices) : null;
  const currentSet = sets.data.sets.find(set => set.id === cart.value?.source.id);
  const changed = cart.value && sets.loaded && (sets.error || JSON.stringify(currentSet) !== JSON.stringify(cart.value.originalSource ?? cart.value.source));
  return (
    <section className="flex min-w-0 flex-col gap-6" aria-labelledby="cart-title">
      <h1 id="cart-title" className="text-h1">{t("Cart")}</h1>
      {drafts.error && <ErrorState description={drafts.error} onRetry={retryDrafts} />}
      {cart.error ? <ErrorState description={cart.error} onRetry={retryCart} /> : basket && cart.value ? <>
        <article className={panelStyles}>
          <ShoppingCart className="h-6 w-6 text-primary-700" aria-hidden="true" />
          <h2 className="break-words text-h4">{t("{name} at {store}", { name: cart.value.source.name, store: basket.storeName })}</h2>
          {cart.value.city && <p className="text-body-sm text-neutral-600">{t("City")}: {t(cities.find(city => city.id === cart.value!.city)!.name)}</p>}
          {cart.value.originalSource && <p className="text-body-sm text-neutral-600">{t("Quantities adjusted for this basket only. Your saved set is unchanged.")}</p>}
          {preferences.loaded && (!effectiveStores(preferences.value).includes(cart.value.storeId) || cart.value.city && cart.value.city !== preferences.value.city) && <p className="text-body-sm text-status-warning">{t("Preferences changed. This basket keeps its confirmed city and store. Compare again to refresh it.")}</p>}
          <output aria-label={t("Cart total")} className="text-h3">{money(basket.totalCents)}</output>
          {!!basket.excludedCount && <p className="flex items-start gap-2 text-body-sm text-status-warning"><CircleAlert className="h-6 w-6 shrink-0" aria-hidden="true" />{t(basket.excludedCount === 1 ? "{count} item was explicitly excluded from this basket." : "{count} items were explicitly excluded from this basket.", { count: basket.excludedCount })}</p>}
          {changed && <p className="flex items-start gap-2 text-body-sm text-status-warning"><CircleAlert className="h-6 w-6 shrink-0" aria-hidden="true" />{t("The source set changed or is unavailable. This basket keeps your confirmed snapshot. Compare again to refresh it.")}</p>}
          <BasketLines lines={basket.lines} renderQuantity={line => <CartQuantity key={`${cartIdentity(cart.value!)}:${line.item.id}`} cart={cart.value!} line={line} />} />
        </article>
        <ButtonLink href="/compare" variant="secondary">{t("Change store or set")}</ButtonLink>
      </> : <EmptyState title={t("Your basket is empty")} description={t("Compare a saved set and confirm a store to review your basket here.")} action={{ label: t("Compare My Sets"), href: "/compare" }} />}
    </section>
  );
}
