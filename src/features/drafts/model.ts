import { productForItem, type StoreId } from "../catalog/catalog.ts";
import { units, type MealSet, type SetItem, type Unit } from "../sets/model.ts";

export type Editor = { kind: "set"; setId?: string } | { kind: "item"; setId: string; itemId?: string };
export type SetDraft = { kind: "set"; setId?: string; name: string };
export type ItemDraft = { kind: "item"; setId: string; itemId?: string; name: string; quantity: string; unit: Unit; price: string; mode: "catalog" | "manual"; catalogId: string | null; query: string; store: StoreId | "all" };
export type EditorDraft = SetDraft | ItemDraft;
export type Drafts = { version: 1; editors: Record<string, EditorDraft>; quantities: Record<string, string> };
export const DRAFTS_KEY = "smartbasket.drafts.v1";
export const emptyDrafts = (): Drafts => ({ version: 1, editors: {}, quantities: {} });
export function createDraft(editor: Editor, set?: MealSet, item?: SetItem): EditorDraft {
  if (editor.kind === "set") return { ...editor, name: set?.name ?? "" };
  const product = item ? productForItem(item) : undefined;
  return { ...editor, name: item?.name ?? "", quantity: item ? String(item.quantity) : "1", unit: item?.unit ?? "kg", price: item ? (item.unitPriceCents / 100).toFixed(2) : "0.00", mode: !item || product ? "catalog" : "manual", catalogId: product?.id ?? null, query: "", store: "all" };
}
export function parseDrafts(raw: string): Drafts {
  const value = JSON.parse(raw) as Drafts;
  if (!value || value.version !== 1 || !value.editors || typeof value.editors !== "object" || Array.isArray(value.editors) || !value.quantities || typeof value.quantities !== "object" || Array.isArray(value.quantities)) throw new Error("Invalid drafts.");
  for (const draft of Object.values(value.editors)) {
    if (!draft || typeof draft !== "object" || typeof draft.name !== "string" || (draft.setId !== undefined && typeof draft.setId !== "string")) throw new Error("Invalid editor draft.");
    if (draft.kind === "set") continue;
    if (draft.kind !== "item" || typeof draft.setId !== "string" || (draft.itemId !== undefined && typeof draft.itemId !== "string") || typeof draft.quantity !== "string" || typeof draft.price !== "string" || !units.includes(draft.unit) || !["catalog", "manual"].includes(draft.mode) || !(draft.catalogId === null || typeof draft.catalogId === "string") || typeof draft.query !== "string" || !["all", "atb", "silpo", "varus"].includes(draft.store)) throw new Error("Invalid item draft.");
  }
  if (Object.values(value.quantities).some(quantity => typeof quantity !== "string")) throw new Error("Invalid quantity draft.");
  return value;
}
