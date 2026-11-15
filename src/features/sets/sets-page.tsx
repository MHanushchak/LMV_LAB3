"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleCheck, Copy, ListChecks, Pencil, Plus, Trash2 } from "lucide-react";
import { useLocale } from "@/src/i18n/locale";
import { Button, ButtonLink, EmptyState, ErrorState } from "@/src/components/ui";
import { ProductImage } from "@/src/components/ui/product-image";
import { panelStyles } from "@/src/components/ui/styles";
import { Loading } from "@/components/layout/screen-states";
import { deleteItem, deleteSet, itemTotal, setTotal } from "./model";
import { duplicateSet } from "./duplicate";
import { retryStorage, updateSets, useSets } from "./store";
import { createDraft, type Editor } from "../drafts/model";
import { putEditor, retryDrafts, useDrafts } from "../drafts/store";
import { SetForm } from "./set-form";
import { ItemForm } from "./item-form";
import { SetSummary } from "./set-summary";

export function SetsPage({ setId }: { setId?: string } = {}) {
  const { t, money, itemName, number } = useLocale();
  const { data, loaded, error } = useSets();
  const drafts = useDrafts();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const context = setId ? `/sets/${setId}` : "/sets";
  const pageDraft = drafts.value.editors[context];
  const legacyItemDraft = drafts.value.editors["/sets"]?.kind === "item" ? drafts.value.editors["/sets"] : undefined;
  const inheritedDraft = setId && !pageDraft && legacyItemDraft?.setId === setId ? legacyItemDraft : undefined;
  const editor = setId ? pageDraft ?? inheritedDraft : pageDraft?.kind === "set" ? pageDraft : undefined;
  const editorContext = inheritedDraft ? "/sets" : context;
  const busy = !!editor || (!setId && !!legacyItemDraft);
  if (!loaded || !drafts.loaded) return <Loading />;
  const selectedSet = setId ? data.sets.find(set => set.id === setId) : undefined;
  if (setId && !selectedSet) return <EmptyState title={t("Set not found")} description={t("This set was removed or is not saved on this device.")} action={{ label: t("Back to My Sets"), href: "/sets" }} />;
  const editingSet = editor?.setId ? data.sets.find(set => set.id === editor.setId) : undefined;
  const editingItem = editor?.kind === "item" ? editingSet?.items.find(item => item.id === editor.itemId) : undefined;
  const unavailableEditor = !!editor?.setId && (!editingSet || (editor.kind === "item" && !!editor.itemId && !editingItem));
  function open(next: Editor) {
    setMessage("");
    const source = next.setId ? data.sets.find(set => set.id === next.setId) : undefined;
    const item = next.kind === "item" ? source?.items.find(item => item.id === next.itemId) : undefined;
    putEditor(context, createDraft(next, source, item));
  }
  const close = () => putEditor(editorContext, null);
  function copy(id: string) {
    const newId = crypto.randomUUID();
    if (updateSets(current => duplicateSet(current, id, newId, () => crypto.randomUUID(), t("copy")))) router.push(`/sets/${encodeURIComponent(newId)}`);
  }
  const visibleSets = selectedSet ? [selectedSet] : data.sets;
  return (
    <section className="flex min-w-0 flex-col gap-6" aria-labelledby="sets-title">
      <header className="flex min-w-0 flex-col gap-2">
        {setId && <ButtonLink href="/sets" variant="text">{t("Back to My Sets")}</ButtonLink>}
        <h1 id="sets-title" className="break-words text-h1">{selectedSet?.name ?? t("My Sets")}</h1>
        <p className="text-body-sm text-neutral-600">{t(selectedSet ? "Set details" : "Your routine, ready for the next shop. Saved on this device.")}</p>
      </header>
      {error && <ErrorState title={t("Storage unavailable")} description={error} onRetry={retryStorage} />}
      {drafts.error && <ErrorState description={drafts.error} onRetry={retryDrafts} />}
      <p role="status" className={message ? "flex items-start gap-2 text-body-sm text-status-success" : "sr-only"}>{message && <CircleCheck aria-hidden="true" className="h-6 w-6 shrink-0" strokeWidth={2} />}{t(message)}</p>
      {unavailableEditor ? <EmptyState title={t("Draft item is unavailable")} description={t("The original set or item was removed. You can discard this draft.")} action={{ label: t("Discard draft"), onClick: close }} /> : <>
        {editor?.kind === "set" && <SetForm draft={editor} onChange={draft => putEditor(editorContext, draft)} set={editingSet} onClose={close} onSaved={setMessage} />}
        {editor?.kind === "item" && editingSet && <ItemForm draft={editor} onChange={draft => putEditor(editorContext, draft)} set={editingSet} item={editingItem} onClose={close} onSaved={setMessage} />}
      </>}
      {!setId && legacyItemDraft && <section className={panelStyles}>
        <p className="text-body-sm text-neutral-600">{t("Unfinished item changes are saved. Continue on the set page.")}</p>
        <ButtonLink href={`/sets/${encodeURIComponent(legacyItemDraft.setId!)}`}>{t("Continue draft")}</ButtonLink>
        <Button variant="text" onClick={() => putEditor("/sets", null)}>{t("Discard draft")}</Button>
      </section>}
      {!setId && !error && !data.sets.length && !busy && <EmptyState title={t("No saved sets yet")} description={t("Build a reusable meal template with the exact groceries you need.")} action={{ label: t("Create First Set"), onClick: () => open({ kind: "set" }) }} />}
      {!setId && !!data.sets.length && <Button onClick={() => open({ kind: "set" })} disabled={!!error || busy}><Plus className="h-6 w-6" aria-hidden="true" />{t("New Set")}</Button>}
      {!setId && !!data.sets.length && <ul className="flex min-w-0 flex-col gap-3" aria-label={t("My Sets")}>
        {data.sets.map(set => <li key={set.id} className="min-w-0">
          <SetSummary set={set} disabled={!!error || busy} onRename={() => open({ kind: "set", setId: set.id })} onDuplicate={() => copy(set.id)} onDelete={() => { setMessage(""); updateSets(data => deleteSet(data, set.id, crypto.randomUUID())); }} />
        </li>)}
      </ul>}
      {setId && visibleSets.map(set => (
        <article key={set.id} className={panelStyles} aria-label={t("Set: {name}", { name: set.name })}>
          <div className="flex min-w-0 flex-col gap-2">
            <ListChecks className="h-6 w-6 text-primary-700" strokeWidth={2} aria-hidden="true" />
            <h2 className="break-words text-h4">{selectedSet ? t("Products") : set.name}</h2>
            <p className="text-body-sm text-neutral-600">{t(set.items.length === 1 ? "{count} item · Estimated total" : "{count} items · Estimated total", { count: set.items.length })}</p>
            <output aria-label={t("{name} estimated total", { name: set.name })} className="break-words text-h3">{money(setTotal(set))}</output>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" aria-label={t("Rename {name}", { name: set.name })} disabled={!!error || busy} onClick={() => open({ kind: "set", setId: set.id })}><Pencil className="h-6 w-6" aria-hidden="true" />{t("Rename")}</Button>
            <Button variant="text" aria-label={t("Duplicate {name}", { name: set.name })} disabled={!!error || busy} onClick={() => copy(set.id)}><Copy className="h-6 w-6" aria-hidden="true" />{t("Duplicate")}</Button>
            <Button variant="text" aria-label={t("Delete set {name}", { name: set.name })} disabled={!!error || busy} onClick={() => { setMessage(""); updateSets(data => deleteSet(data, set.id, crypto.randomUUID())); }}><Trash2 className="h-6 w-6" aria-hidden="true" />{t("Delete")}</Button>
          </div>
          {set.items.length ? <ul className="flex min-w-0 flex-col divide-y divide-neutral-300">
            {set.items.map(item => <li key={item.id} className="flex min-w-0 flex-col gap-2 py-3">
              <div className="flex min-w-0 items-start gap-3"><ProductImage name={itemName(item)} /><h3 className="min-w-0 flex-1 break-words text-h6">{itemName(item)}</h3></div>
              <p className="text-body-sm text-neutral-600">{number(item.quantity)} {t(item.unit)} × {money(item.unitPriceCents)} / {t(item.unit)}</p>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <output aria-label={t("{name} subtotal", { name: itemName(item) })} className="text-h6">{money(itemTotal(item))}</output>
                <div className="flex gap-1">
                  <Button variant="text" aria-label={t("Edit {name}", { name: itemName(item) })} disabled={!!error || busy} onClick={() => open({ kind: "item", setId: set.id, itemId: item.id })}><Pencil className="h-6 w-6" aria-hidden="true" /></Button>
                  <Button variant="text" aria-label={t("Delete item {name}", { name: itemName(item) })} disabled={!!error || busy} onClick={() => { setMessage(""); updateSets(data => deleteItem(data, set.id, item.id, crypto.randomUUID())); }}><Trash2 className="h-6 w-6" aria-hidden="true" /></Button>
                </div>
              </div>
            </li>)}
          </ul> : <p className="text-body-sm text-neutral-600">{t("No items yet. Add your first grocery below.")}</p>}
          <Button variant="secondary" disabled={!!error || busy} onClick={() => open({ kind: "item", setId: set.id })} aria-label={t("Add item to {name}", { name: set.name })}><Plus className="h-6 w-6" aria-hidden="true" />{t("Add item")}</Button>
        </article>
      ))}
      {!!selectedSet && <><p className="text-caption text-neutral-600">{t("The starter set uses sample prices in UAH. Edit prices to keep your estimate up to date.")}</p><ButtonLink href={selectedSet ? `/compare?set=${encodeURIComponent(selectedSet.id)}` : "/compare"} variant="secondary">{t("Compare stores")}</ButtonLink></>}
    </section>
  );
}
export const SetsPageStates = {
  Default: SetsPage,
  Loading,
  Error: () => <ErrorState description="Your sets could not be loaded." onRetry={retryStorage} />,
  Empty: () => <EmptyState title="No saved sets yet" description="Start your first reusable shopping set." action={{ label: "Create First Set", href: "/sets" }} />,
};
