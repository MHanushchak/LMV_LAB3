"use client";

import { useLocale } from "@/src/i18n/locale";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button, EmptyState, ErrorState, Input, StatusBadge } from "@/src/components/ui";
import { Loading } from "@/components/layout/screen-states";
import { panelStyles, type UIState } from "@/src/components/ui/styles";
import { ProductImage } from "@/src/components/ui/product-image";
import { searchCatalog, stores, type CatalogProduct, type StoreId } from "./catalog";

type Props = { queryValue?: string; storeValue?: StoreId | "all"; onQueryChange?: (query: string) => void; onStoreChange?: (store: StoreId | "all") => void; onReset?: () => void; onSelect: (product: CatalogProduct) => void; state?: UIState };
export function CatalogSearch({ queryValue, storeValue, onQueryChange, onStoreChange, onReset, onSelect, state = "Default" }: Props) {
  const { t, money, productName } = useLocale();
  const [localQuery, setLocalQuery] = useState("");
  const [localStore, setLocalStore] = useState<StoreId | "all">("all");
  const query = queryValue ?? localQuery;
  const store = storeValue ?? localStore;
  const setQuery = onQueryChange ?? setLocalQuery;
  const setStore = onStoreChange ?? setLocalStore;
  function reset() { if (onReset) onReset(); else { setQuery(""); setStore("all"); } }
  if (state === "Loading") return <Loading />;
  if (state === "Error") return <ErrorState description={t("The catalog could not be displayed.")} onRetry={reset} />;
  const products = state === "Empty" ? [] : searchCatalog(query, store);
  return (
    <section className="flex min-w-0 flex-col gap-4" aria-label={t("Product catalog")}>
      <Input label={t("Search products")} value={query} onChange={event => setQuery(event.target.value)} placeholder={t("Oats, milk, rice…")} helperText={t("Search by product name or pack size.")} disabled={state === "Disabled"} autoFocus />
      <fieldset className="flex min-w-0 flex-col gap-2" disabled={state === "Disabled"}>
        <legend className="mb-2 text-h6">{t("Available at")}</legend>
        <div className="flex flex-wrap gap-2">
          {[{ id: "all", name: t("All stores") }, ...stores].map(filter => <Button key={filter.id} variant={store === filter.id ? "primary" : "secondary"} aria-pressed={store === filter.id} onClick={() => setStore(filter.id as StoreId | "all")}>{t(filter.name)}</Button>)}
        </div>
      </fieldset>
      <p role="status" className="text-body-sm text-neutral-600">{t(products.length === 1 ? "{count} product found" : "{count} products found", { count: products.length })}</p>
      {!products.length ? <EmptyState icon={Search} title={t("No products found")} description={t("Try another product name or reset your store filter.")} action={{ label: t("Reset Filters"), onClick: reset }} /> : (
        <ul className="flex min-w-0 flex-col gap-3">
          {products.map(product => <li key={product.id} className={panelStyles}>
            <ProductImage name={productName(product)} productId={product.id} />
            <h3 className="break-words text-h6">{productName(product)}</h3>
            <p className="text-body-sm text-neutral-600">{t(product.packLabel)}</p>
            <p className="text-body-sm">{t("{price} / pack", { price: store === "all" ? t("Estimate: {price}", { price: money(Math.round(product.referenceUnitPriceCents * product.packQuantity)) }) : t("{price} at {store}", { price: money(product.offers[store].packPriceCents), store: stores.find(value => value.id === store)!.name }) })}</p>
            {store !== "all" && <StatusBadge status="in-stock" />}
            <Button variant="secondary" disabled={state === "Disabled"} onClick={() => onSelect(product)} aria-label={t("Choose product: {name}", { name: productName(product) })}>{t("Choose product")}</Button>
          </li>)}
        </ul>
      )}
    </section>
  );
}
export const CatalogSearchStates = {
  Default: CatalogSearch,
  Loading: (props: Props) => <CatalogSearch {...props} state="Loading" />,
  Error: (props: Props) => <CatalogSearch {...props} state="Error" />,
  Empty: (props: Props) => <CatalogSearch {...props} state="Empty" />,
  Disabled: (props: Props) => <CatalogSearch {...props} state="Disabled" />,
};
