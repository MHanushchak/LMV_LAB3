"use client";

import { createLocalStore } from "@/src/lib/local-store";
import { DRAFTS_KEY, emptyDrafts, parseDrafts, type EditorDraft } from "./model";
const store = createLocalStore(DRAFTS_KEY, emptyDrafts(), parseDrafts, { memoryFallback: true, readError: "Drafts could not be read. Your saved sets are unchanged.", writeError: "Drafts are kept for this session only. Check browser storage and retry to save them." });
export const useDrafts = store.useStore;
export const retryDrafts = store.retry;
export function putEditor(context: string, draft: EditorDraft | null) {
  return store.update(current => {
    const editors = { ...current.editors };
    if (draft) editors[context] = draft; else delete editors[context];
    return { ...current, editors };
  });
}
export function putQuantity(key: string, quantity: string | null) {
  return store.update(current => {
    const quantities = { ...current.quantities };
    if (quantity !== null) quantities[key] = quantity; else delete quantities[key];
    return { ...current, quantities };
  });
}
