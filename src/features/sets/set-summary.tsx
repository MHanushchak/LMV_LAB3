"use client";

import { ArrowRight, Copy, Pencil, Trash2 } from "lucide-react";
import { Button, ButtonLink } from "@/src/components/ui";
import { panelStyles } from "@/src/components/ui/styles";
import { useLocale } from "@/src/i18n/locale";
import type { MealSet } from "./model";

type Props = { set: MealSet; disabled?: boolean; onRename: () => void; onDuplicate: () => void; onDelete: () => void };
export function SetSummary({ set, disabled, onRename, onDuplicate, onDelete }: Props) {
  const { t } = useLocale();
  return (
    <article className={panelStyles} aria-label={t("Set: {name}", { name: set.name })}>
      <h2 className="break-words text-h4">{set.name}</h2>
      <ButtonLink href={`/sets/${encodeURIComponent(set.id)}`} className="w-full">{t("Open set")}<ArrowRight className="h-6 w-6" strokeWidth={2} aria-hidden="true" /></ButtonLink>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t("Actions for {name}", { name: set.name })}>
        <Button variant="secondary" disabled={disabled} title={t("Rename")} aria-label={t("Rename {name}", { name: set.name })} onClick={onRename}><Pencil className="h-6 w-6" strokeWidth={2} aria-hidden="true" /></Button>
        <Button variant="text" disabled={disabled} title={t("Duplicate")} aria-label={t("Duplicate {name}", { name: set.name })} onClick={onDuplicate}><Copy className="h-6 w-6" strokeWidth={2} aria-hidden="true" /></Button>
        <Button variant="text" disabled={disabled} title={t("Delete")} aria-label={t("Delete set {name}", { name: set.name })} onClick={onDelete}><Trash2 className="h-6 w-6" strokeWidth={2} aria-hidden="true" /></Button>
      </div>
    </article>
  );
}
