"use client";

import { useLocale } from "@/src/i18n/locale";

import { Undo2, X } from "lucide-react";
import { Button, ErrorState } from "@/src/components/ui";
import { dismissDeletion, undoDeletion } from "./model";
import { retryStorage, updateSets, useSets } from "./store";

export function UndoNotifications() {
  const { t, itemName } = useLocale();
  const { data, error } = useSets();
  if (!data.pending.length) return null;
  return (
    <aside aria-label={t("Deletion notifications")} className="flex max-h-48 shrink-0 flex-col gap-2 overflow-y-auto border-t border-neutral-300 bg-white p-2">
      {error && <ErrorState description={error} onRetry={retryStorage} />}
      {data.pending.map(entry => (
        <div key={entry.id} className="flex min-w-0 flex-wrap items-center gap-2 rounded-[10px] bg-primary-100 px-3 py-2">
          <p role="status" className="min-w-0 basis-full break-words text-body-sm text-neutral-900">{t("Removed “{name}”", { name: entry.kind === "item" ? itemName(entry.item) : entry.label })}</p>
          <Button variant="text" disabled={!!error} onClick={() => updateSets(data => undoDeletion(data, entry.id))}><Undo2 className="h-6 w-6" aria-hidden="true" />{t("Undo")}</Button>
          <Button variant="text" disabled={!!error} aria-label={t("Dismiss deletion of {name}", { name: entry.kind === "item" ? itemName(entry.item) : entry.label })} onClick={() => updateSets(data => dismissDeletion(data, entry.id))}><X className="h-6 w-6" aria-hidden="true" />{t("Dismiss")}</Button>
        </div>
      ))}
    </aside>
  );
}
