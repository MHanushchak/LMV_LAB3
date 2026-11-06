export const STORAGE_KEY = "smartbasket.sets.v1";
export const units = ["kg", "L", "pcs"] as const;
export type Unit = typeof units[number];
export type SetItem = { id: string; name: string; quantity: number; unit: Unit; unitPriceCents: number; catalogId?: string | null };
export type MealSet = { id: string; name: string; items: SetItem[] };
export type PendingDeletion =
  | { id: string; kind: "set"; set: MealSet; index: number; label: string }
  | { id: string; kind: "item"; setId: string; item: SetItem; index: number; label: string };
export type SetsData = { version: 1; sets: MealSet[]; pending: PendingDeletion[] };

export function initialData(): SetsData {
  return {
    version: 1,
    sets: [{ id: "weekly-diet", name: "Weekly Diet", items: [
      { id: "oats", catalogId: "rolled-oats", name: "Rolled oats", quantity: 1.5, unit: "kg", unitPriceCents: 6000 },
      { id: "milk", catalogId: "milk", name: "Milk", quantity: 2, unit: "L", unitPriceCents: 4500 },
      { id: "eggs", catalogId: "eggs", name: "Eggs", quantity: 10, unit: "pcs", unitPriceCents: 700 },
    ] }],
    pending: [],
  };
}

export function validateSetName(name: string, sets: MealSet[], excludeId?: string): string | undefined {
  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > 40) return "Enter 2–40 characters.";
  if (sets.some(set => set.id !== excludeId && set.name.trim().toLocaleLowerCase() === trimmed.toLocaleLowerCase())) return "A set with this name already exists.";
}
export function validQuantity(quantity: number) {
  return Number.isFinite(quantity) && quantity > 0 && quantity <= 1000000 && Math.abs(quantity * 1000 - Math.round(quantity * 1000)) < 0.000001;
}
export function itemTotal(item: SetItem) {
  return Math.round(Math.round(item.quantity * 1000) * item.unitPriceCents / 1000);
}
export function setTotal(set: MealSet) {
  return set.items.reduce((total, item) => total + itemTotal(item), 0);
}
export function money(cents: number) {
  return new Intl.NumberFormat("en-UA", { style: "currency", currency: "UAH" }).format(cents / 100);
}

function object(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function validItem(value: unknown): value is SetItem {
  return object(value) && (value.catalogId === undefined || value.catalogId === null || typeof value.catalogId === "string" && value.catalogId.length > 0 && value.catalogId.length <= 80) && typeof value.id === "string" && value.id.length > 0 && typeof value.name === "string" && value.name.trim().length > 0 && value.name.length <= 120 && typeof value.quantity === "number" && validQuantity(value.quantity) && units.includes(value.unit as Unit) && Number.isSafeInteger(value.unitPriceCents) && (value.unitPriceCents as number) >= 0 && (value.unitPriceCents as number) <= 10000000;
}
function validSet(value: unknown): value is MealSet {
  return object(value) && typeof value.id === "string" && value.id.length > 0 && typeof value.name === "string" && value.name === value.name.trim() && value.name.length >= 2 && value.name.length <= 40 && Array.isArray(value.items) && value.items.every(validItem) && new Set(value.items.map(item => item.id)).size === value.items.length;
}
export function parseData(raw: string): SetsData {
  const value: unknown = JSON.parse(raw);
  if (!object(value) || value.version !== 1 || !Array.isArray(value.sets) || !value.sets.every(validSet) || !Array.isArray(value.pending)) throw new Error("Invalid saved sets.");
  const ids = new Set(value.sets.map(set => set.id));
  const names = new Set(value.sets.map(set => set.name.toLocaleLowerCase()));
  if (ids.size !== value.sets.length || names.size !== value.sets.length) throw new Error("Duplicate saved sets.");
  const pendingIds = new Set<string>();
  for (const pending of value.pending) {
    if (!object(pending) || typeof pending.id !== "string" || !pending.id || pendingIds.has(pending.id) || typeof pending.label !== "string" || !Number.isSafeInteger(pending.index) || (pending.index as number) < 0) throw new Error("Invalid pending deletion.");
    pendingIds.add(pending.id);
    if (pending.kind === "set" && validSet(pending.set) && !ids.has(pending.set.id)) continue;
    if (pending.kind === "item" && typeof pending.setId === "string" && validItem(pending.item)) {
      const parent = value.sets.find(set => set.id === pending.setId) ?? value.pending.find(other => object(other) && other.kind === "set" && validSet(other.set) && other.set.id === pending.setId)?.set;
      if (validSet(parent) && !parent.items.some(item => item.id === (pending.item as SetItem).id)) continue;
    }
    throw new Error("Invalid pending deletion.");
  }
  return value as SetsData;
}

export function deleteSet(data: SetsData, setId: string, undoId: string): SetsData {
  const index = data.sets.findIndex(set => set.id === setId);
  if (index < 0) return data;
  const set = data.sets[index];
  return { ...data, sets: data.sets.filter(set => set.id !== setId), pending: [...data.pending, { id: undoId, kind: "set", set, index, label: set.name }] };
}
export function deleteItem(data: SetsData, setId: string, itemId: string, undoId: string): SetsData {
  const set = data.sets.find(set => set.id === setId);
  const index = set?.items.findIndex(item => item.id === itemId) ?? -1;
  if (!set || index < 0) return data;
  return { ...data, sets: data.sets.map(set => set.id === setId ? { ...set, items: set.items.filter(item => item.id !== itemId) } : set), pending: [...data.pending, { id: undoId, kind: "item", setId, item: set.items[index], index, label: set.items[index].name }] };
}
export function undoDeletion(data: SetsData, undoId: string): SetsData {
  const deleted = data.pending.find(entry => entry.id === undoId);
  if (!deleted) return data;
  const next = { ...data, sets: [...data.sets], pending: data.pending.filter(entry => entry.id !== undoId) };
  if (deleted.kind === "set") {
    // Keep newly created sets intact; recover name collisions without losing data.
    let name = deleted.set.name;
    let suffix = 1;
    while (next.sets.some(set => set.name.toLocaleLowerCase() === name.toLocaleLowerCase())) {
      const tail = ` (${suffix++})`;
      name = `${deleted.set.name.slice(0, 40 - tail.length)}${tail}`;
    }
    next.sets.splice(Math.min(deleted.index, next.sets.length), 0, { ...deleted.set, name });
  } else {
    const restoreItem = (set: MealSet) => {
      const items = [...set.items];
      items.splice(Math.min(deleted.index, items.length), 0, deleted.item);
      return { ...set, items };
    };
    next.sets = next.sets.map(set => set.id === deleted.setId ? restoreItem(set) : set);
    // An item's parent may also be awaiting undo. Restore into that snapshot.
    next.pending = next.pending.map(entry => entry.kind === "set" && entry.set.id === deleted.setId ? { ...entry, set: restoreItem(entry.set) } : entry);
  }
  return next;
}
export function dismissDeletion(data: SetsData, undoId: string): SetsData {
  const deleted = data.pending.find(entry => entry.id === undoId);
  return { ...data, pending: data.pending.filter(entry => entry.id !== undoId && !(deleted?.kind === "set" && entry.kind === "item" && entry.setId === deleted.set.id)) };
}
