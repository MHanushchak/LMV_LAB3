"use client";

import { useRouter } from "next/navigation";
import { Copy, Pencil, Plus, Trash2 } from "lucide-react";
import { useLocale } from "@/src/i18n/locale";
import { Button, ButtonLink, EmptyState, ErrorState } from "@/src/components/ui";
import { ProductImage } from "@/src/components/ui/product-image";
import { panelStyles } from "@/src/components/ui/styles";
import { ActionBar } from "@/components/layout/action-bar";
import { Loading } from "@/components/layout/screen-states";
import { deleteItem, deleteSet, itemTotal, setTotal } from "./model";
import { duplicateSet } from "./duplicate";
import { retryStorage, updateSets, useSets } from "./store";
import { createDraft, type Editor } from "../drafts/model";
import { putEditor, retryDrafts, useDrafts } from "../drafts/store";
import { SetForm } from "./set-form";
import { ItemForm } from "./item-form";
import { SetSummary } from "./set-summary";
import { toast } from "../notifications/store";
import { productForItem } from "../catalog/catalog";

export function SetsPage({ setId }: { setId?: string } = {}) {
  const { t, money, itemName, number } = useLocale();
  const { data, loaded, error } = useSets();
  const drafts = useDrafts();
  const router = useRouter();
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
    const source = next.setId ? data.sets.find(set => set.id === next.setId) : undefined;
    const item = next.kind === "item" ? source?.items.find(item => item.id === next.itemId) : undefined;
    putEditor(context, createDraft(next, source, item));
  }
  const close = () => {
    toast.dismiss("set-validation");
    toast.dismiss("item-validation");
    putEditor(editorContext, null);
    requestAnimationFrame(() => {
      document.getElementById("main-content")?.scrollTo({ top: 0 });
      document.getElementById("sets-title")?.focus({ preventScroll: true });
    });
  };
  function copy(id: string) {
    const newId = crypto.randomUUID();
    if (updateSets(current => duplicateSet(current, id, newId, () => crypto.randomUUID(), t("copy")))) {
      toast.success("Set copied.");
      router.push(`/sets/${encodeURIComponent(newId)}`);
    }
  }
  const visibleSets = selectedSet ? [selectedSet] : data.sets;
  return (
    <section className="flex min-w-0 flex-col gap-6" aria-labelledby={editor ? undefined : "sets-title"} aria-label={editor ? t(editor.kind === "item" ? "Add item" : "Edit") : undefined}>
      {!editor && <header className="flex min-w-0 flex-col gap-2">
        {setId && <ButtonLink href="/sets" variant="text">{t("Back to My Sets")}</ButtonLink>}
        <h1 tabIndex={-1} id="sets-title" className="break-words text-h1">{selectedSet?.name ?? t("My Sets")}</h1>
        <p className="text-body-sm text-neutral-600">{t(selectedSet ? "Set details" : "Your routine, ready for the next shop. Saved on this device.")}</p>
      </header>}
      {error && <ErrorState title={t("Storage unavailable")} description={error} onRetry={retryStorage} />}
      {drafts.error && <ErrorState description={drafts.error} onRetry={retryDrafts} />}
      {unavailableEditor ? <EmptyState title={t("Draft item is unavailable")} description={t("The original set or item was removed. You can discard this draft.")} action={{ label: t("Discard draft"), onClick: close }} /> : <>
        {editor?.kind === "set" && <SetForm draft={editor} onChange={draft => putEditor(editorContext, draft)} set={editingSet} onClose={close} onSaved={message => toast.success(message)} />}
        {editor?.kind === "item" && editingSet && <ItemForm draft={editor} onChange={draft => putEditor(editorContext, draft)} set={editingSet} item={editingItem} onClose={close} onSaved={message => toast.success(message)} />}
      </>}
      {!editor && <>
      {!setId && legacyItemDraft && <section className={panelStyles}>
        <p className="text-body-sm text-neutral-600">{t("Unfinished item changes are saved. Continue on the set page.")}</p>
        <ButtonLink href={`/sets/${encodeURIComponent(legacyItemDraft.setId!)}`}>{t("Continue draft")}</ButtonLink>
        <Button variant="text" onClick={() => putEditor("/sets", null)}>{t("Discard draft")}</Button>
      </section>}
      {!setId && !error && !data.sets.length && !busy && <EmptyState title={t("No saved sets yet")} description={t("Build a reusable meal template with the exact groceries you need.")} action={{ label: t("Create First Set"), onClick: () => open({ kind: "set" }) }} />}
      {!setId && !!data.sets.length && <Button onClick={() => open({ kind: "set" })} disabled={!!error || busy}><Plus className="h-6 w-6" aria-hidden="true" />{t("New Set")}</Button>}
      {!setId && !!data.sets.length && <ul className="flex min-w-0 flex-col gap-3" aria-label={t("My Sets")}>
        {data.sets.map(set => <li key={set.id} className="min-w-0">
          <SetSummary set={set} disabled={!!error || busy} onRename={() => open({ kind: "set", setId: set.id })} onDuplicate={() => copy(set.id)} onDelete={() => { updateSets(data => deleteSet(data, set.id, crypto.randomUUID())); }} />
        </li>)}
      </ul>}
      {setId && visibleSets.map(set => (
        <article key={set.id} className={panelStyles} aria-label={t("Set: {name}", { name: set.name })}>
          <div className="flex min-w-0 flex-row flex-wrap items-center justify-between gap-2">
            <h2 className="break-words text-h4">{selectedSet ? t("Products") : set.name}</h2>
            <p className="text-body-sm text-neutral-600">{t("{count} products", { count: set.items.length })}</p>
          </div>
          <div className="flex min-w-0 flex-nowrap gap-1" aria-label={t("Manage set")}>
            <Button className="set-action flex-1" variant="secondary" aria-label={t("Rename {name}", { name: set.name })} disabled={!!error || busy} onClick={() => open({ kind: "set", setId: set.id })}><Pencil className="h-4 w-4 shrink-0" aria-hidden="true" />{t("Change name")}</Button>
            <Button className="set-action flex-1" variant="secondary" aria-label={t("Duplicate {name}", { name: set.name })} disabled={!!error || busy} onClick={() => copy(set.id)}><Copy className="h-4 w-4 shrink-0" aria-hidden="true" />{t("Make copy")}</Button>
            <Button className="set-action flex-1 text-status-error" variant="secondary" aria-label={t("Delete set {name}", { name: set.name })} disabled={!!error || busy} onClick={() => updateSets(data => deleteSet(data, set.id, crypto.randomUUID()))}><Trash2 className="h-4 w-4 shrink-0" aria-hidden="true" />{t("Delete")}</Button>
          </div>
          {set.items.length ? <ul className="flex min-w-0 flex-col divide-y divide-neutral-300">
            {set.items.map(item => <li key={item.id} className="flex min-w-0 items-center gap-3 py-3">
              <ProductImage name={itemName(item)} productId={productForItem(item)?.id} />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <h3 className="break-words text-h6">{itemName(item)}</h3>
                <p className="text-body-sm text-neutral-600">{number(item.quantity)} {t(item.unit)} × {money(item.unitPriceCents)}</p>
                <output aria-label={t("{name} subtotal", { name: itemName(item) })} className="text-h6">{money(itemTotal(item))}</output>
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                  <Button variant="text" aria-label={t("Edit {name}", { name: itemName(item) })} disabled={!!error || busy} onClick={() => open({ kind: "item", setId: set.id, itemId: item.id })}><Pencil className="h-6 w-6" aria-hidden="true" /></Button>
                  <Button variant="text" aria-label={t("Delete item {name}", { name: itemName(item) })} disabled={!!error || busy} onClick={() => { updateSets(data => deleteItem(data, set.id, item.id, crypto.randomUUID())); }}><Trash2 className="h-6 w-6" aria-hidden="true" /></Button>
              </div>
            </li>)}
          </ul> : <p className="text-body-sm text-neutral-600">{t("No items yet. Add your first grocery below.")}</p>}

        </article>
      ))}
      {!!selectedSet && <ActionBar>
        <div className="flex w-full min-w-0 items-center justify-between gap-2"><span className="text-body-sm text-neutral-600">{t("Estimated total")}</span><output className="text-h4">{money(setTotal(selectedSet))}</output></div>
        <Button className="flex-1" variant="secondary" disabled={!!error || busy} onClick={() => open({ kind: "item", setId: selectedSet.id })} aria-label={t("Add item to {name}", { name: selectedSet.name })}><Plus className="h-6 w-6" aria-hidden="true" />{t("Add")}</Button>
        {!!selectedSet.items.length && <ButtonLink className="flex-1" href={`/compare?set=${encodeURIComponent(selectedSet.id)}`}>{t("Compare prices")}</ButtonLink>}
      </ActionBar>}
      </>}

    </section>
  );
}
export const SetsPageStates = {
  Default: SetsPage,
  Loading,
  Error: () => <ErrorState description="Your sets could not be loaded." onRetry={retryStorage} />,
  Empty: () => <EmptyState title="No saved sets yet" description="Start your first reusable shopping set." action={{ label: "Create First Set", href: "/sets" }} />,
};
