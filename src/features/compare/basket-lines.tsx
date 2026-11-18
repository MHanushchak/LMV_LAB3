"use client";

import { useLocale } from "@/src/i18n/locale";

import { CircleAlert, MinusCircle } from "lucide-react";
import { StatusBadge } from "@/src/components/ui";
import { ProductImage } from "@/src/components/ui/product-image";
import type { ReactNode } from "react";
import type { BasketLine } from "./model";
import { productForItem } from "../catalog/catalog";

export function BasketLines({ lines, renderQuantity }: { lines: BasketLine[]; renderQuantity?: (line: BasketLine) => ReactNode }) {
  const { t, money, itemName, productName, number } = useLocale();
  return (
    <ul className="flex min-w-0 flex-col divide-y divide-neutral-300">
      {lines.map(line => <li key={line.item.id} className="flex min-w-0 flex-col gap-2 py-3">
        <div className="flex min-w-0 items-start gap-3"><ProductImage name={line.product ? productName(line.product) : itemName(line.item)} productId={line.product?.id ?? productForItem(line.item)?.id} /><h3 className="min-w-0 flex-1 break-words text-h6">{line.product ? productName(line.product) : itemName(line.item)}</h3></div>
        {line.substituted && <p className="break-words text-body-sm text-neutral-600">{t("Substitute for {name}", { name: itemName(line.item) })}</p>}
        <p className="text-body-sm text-neutral-600">{t("Requested: {quantity} {unit}", { quantity: number(line.item.quantity), unit: t(line.item.unit) })}</p>
        {line.status === "available" && renderQuantity?.(line)}
        {line.status === "available" ? <>
          <p className="text-body-sm">{line.sharedPacks && line.packs === 0 ? t("Included in shared packs above") : `${line.sharedPacks ? t("Shared packs: ") : ""}${line.packs} × ${t(line.product!.packLabel)} · ${money(line.totalCents)}`}</p>
          <p className="text-body-sm text-neutral-600">{t("Supplied: {quantity} {unit}", { quantity: number(line.suppliedQuantity), unit: t(line.item.unit) })}{line.suppliedQuantity > line.item.quantity && t(" (+{quantity} {unit} extra)", { quantity: number(Math.round((line.suppliedQuantity - line.item.quantity) * 1000) / 1000), unit: t(line.item.unit) })}</p>
          <StatusBadge status="in-stock" />
        </> : line.status === "excluded" ? <p className="flex items-start gap-2 text-body-sm text-neutral-600"><MinusCircle className="h-6 w-6 shrink-0" aria-hidden="true" />{t("Excluded from this basket")}</p> : <p className="flex items-start gap-2 text-body-sm text-status-error"><CircleAlert className="h-6 w-6 shrink-0" aria-hidden="true" />{t(line.reason ?? "")}</p>}
      </li>)}
    </ul>
  );
}
