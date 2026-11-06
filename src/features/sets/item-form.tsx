"use client";

import { useLocale } from "@/src/i18n/locale";

import { useId, useRef, useState, type FormEvent } from "react";
import { Button, Input } from "@/src/components/ui";
import { fieldStyles, panelStyles } from "@/src/components/ui/styles";
import { itemTotal, units, validQuantity, type MealSet, type SetItem, type Unit } from "./model";
import { updateSets, useSets } from "./store";
import type { ItemDraft } from "../drafts/model";
import { ProductImage } from "@/src/components/ui/product-image";
import { CatalogSearch } from "../catalog/catalog-search";
import { findProduct, type CatalogProduct } from "../catalog/catalog";

type Props = { draft: ItemDraft; onChange: (draft: ItemDraft) => void; set: MealSet; item?: SetItem; onClose: () => void; onSaved: (message: string) => void };
export function ItemForm({ draft, onChange, set, item, onClose, onSaved }: Props) {
  const { t, money, productName } = useLocale();
  const { error: storageError } = useSets();
  const { name, quantity, unit, price, mode } = draft;
  const selected = mode === "catalog" ? findProduct(draft.catalogId) : undefined;
  const setName = (name: string) => onChange({ ...draft, name });
  const setQuantity = (quantity: string) => onChange({ ...draft, quantity });
  const setUnit = (unit: Unit) => onChange({ ...draft, unit });
  const setPrice = (price: string) => onChange({ ...draft, price });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const unitId = useId();
  const numericQuantity = Number(quantity);
  const numericPrice = Number(price);
  const errors = {
    name: name.trim().length === 0 || name.trim().length > 120 ? "Enter an item name of 1–120 characters." : undefined,
    quantity: !quantity.trim() || !validQuantity(numericQuantity) ? "Enter a quantity above 0, up to 1,000,000, with at most 3 decimal places." : undefined,
    price: !/^\d+(\.\d{1,2})?$/.test(price) || !Number.isFinite(numericPrice) || numericPrice < 0 || numericPrice > 100000 ? "Enter a price from 0 to 100,000 with at most 2 decimal places." : undefined,
  };
  const preview = !errors.quantity && !errors.price ? itemTotal({ id: "preview", name, quantity: numericQuantity, unit, unitPriceCents: Math.round(numericPrice * 100) }) : null;
  const otherTotal = set.items.filter(existing => existing.id !== item?.id).reduce((sum, existing) => sum + itemTotal(existing), 0);
  const showError = (field: keyof typeof errors) => submitted || touched[field] ? errors[field] : undefined;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === "catalog" && !selected) return;
    setSubmitted(true);
    if (Object.values(errors).some(Boolean)) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>("[aria-invalid=true]")?.focus());
      return;
    }
    const nextItem: SetItem = { catalogId: selected?.id ?? null, id: item?.id ?? crypto.randomUUID(), name: name.trim(), quantity: numericQuantity, unit, unitPriceCents: Math.round(numericPrice * 100) };
    const saved = updateSets(current => {
      const parent = current.sets.find(existing => existing.id === set.id);
      if (!parent || (item && !parent.items.some(existing => existing.id === item.id))) throw new Error("This item or set is no longer available.");
      return { ...current, sets: current.sets.map(existing => existing.id !== set.id ? existing : { ...existing, items: item ? existing.items.map(value => value.id === item.id ? nextItem : value) : [...existing.items, nextItem] }) };
    });
    if (saved) { onSaved(item ? "Item updated." : "Item added."); onClose(); }
  }
  function chooseProduct(product: CatalogProduct) {
    onChange({ ...draft, catalogId: product.id, name: product.name, unit: product.unit, price: (product.referenceUnitPriceCents / 100).toFixed(2) });
    setTouched({});
    setSubmitted(false);
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('input[name="quantity"]')?.focus());
  }
  const showFields = mode === "manual" || !!selected;
  return (
    <form ref={formRef} onSubmit={submit} noValidate className={panelStyles} aria-label={item ? t("Edit item") : t("Add item")}>
      <h2 className="break-words text-h4">{item ? t("Edit item") : t("Add item")} · {set.name}</h2>
      <div className="flex flex-wrap gap-2" aria-label={t("Item entry method")}>
        <Button variant={mode === "catalog" ? "primary" : "secondary"} aria-pressed={mode === "catalog"} onClick={() => onChange({ ...draft, mode: "catalog", catalogId: null })}>{t("Search catalog")}</Button>
        <Button variant={mode === "manual" ? "primary" : "secondary"} aria-pressed={mode === "manual"} onClick={() => onChange({ ...draft, mode: "manual", catalogId: null })}>{t("Manual entry")}</Button>
      </div>
      {mode === "catalog" && !selected && <CatalogSearch onReset={() => onChange({ ...draft, query: "", store: "all" })} queryValue={draft.query} storeValue={draft.store} onQueryChange={query => onChange({ ...draft, query })} onStoreChange={store => onChange({ ...draft, store })} onSelect={chooseProduct} state={storageError ? "Disabled" : "Default"} />}
      {selected && <ProductImage name={productName(selected)} />}
      {selected && <p className="rounded-[10px] bg-primary-100 p-3 text-body-sm">{t(selected.packLabel)} · {t("Catalog matched. Store comparison uses whole-pack demo prices.")}</p>}
      {showFields && <>
      <Input readOnly={!!selected} label={t("Item name")} name="itemName" value={selected ? productName(selected) : name} onChange={event => { setName(event.target.value); setTouched(current => ({ ...current, name: true })); }} error={showError("name")} required autoFocus={!selected && mode === "manual"} />
      <Input label={t("Quantity")} name="quantity" type="number" inputMode="decimal" min="0.001" max="1000000" step="0.001" value={quantity} onChange={event => { setQuantity(event.target.value); setTouched(current => ({ ...current, quantity: true })); }} helperText={t("Exact amounts, up to 3 decimal places.")} error={showError("quantity")} required />
      <div className="flex min-w-0 flex-col gap-2">
        <label htmlFor={unitId} className="text-h6">{t("Unit")}</label>
        <select id={unitId} name="unit" disabled={!!selected} value={unit} onChange={event => setUnit(event.target.value as Unit)} className={fieldStyles}>{units.map(value => <option key={value} value={value}>{t(value)}</option>)}</select>
      </div>
      <Input label={t("Price per {unit} (UAH)", { unit: t(unit) })} name="price" type="number" inputMode="decimal" min="0" max="100000" step="0.01" value={price} onChange={event => { setPrice(event.target.value); setTouched(current => ({ ...current, price: true })); }} helperText={t("An estimate you can edit; live retailer prices are not connected yet.")} error={showError("price")} required />
      <div aria-live="polite" className="flex flex-col gap-2 rounded-[10px] bg-primary-100 p-3 text-body-sm">
        <p>{t("Item total: ")}<output aria-label={t("Item total")} className="font-semibold">{preview === null ? "—" : money(preview)}</output></p>
        <p>{t("Set total after saving: ")}<output aria-label={t("Set total after saving")} className="font-semibold">{preview === null ? "—" : money(otherTotal + preview)}</output></p>
      </div>
      </>}
      <p className="text-caption text-neutral-600">{t("Draft saved automatically. Cancel discards it.")}</p>
      <div className="flex flex-wrap gap-2">
        {showFields && <Button type="submit" disabled={!!storageError}>{t("Save item")}</Button>}
        <Button variant="text" onClick={onClose}>{t("Cancel")}</Button>
      </div>
    </form>
  );
}
