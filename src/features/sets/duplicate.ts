import { productForItem } from "../catalog/catalog.ts";
import type { SetsData } from "./model.ts";
export function duplicateSet(data: SetsData, setId: string, newId: string, itemId: () => string, copyLabel = "copy"): SetsData {
  const source = data.sets.find(set => set.id === setId);
  if (!source) throw new Error("Set no longer exists.");
  let counter = 1;
  let name: string;
  do {
    const suffix = ` (${copyLabel}${counter > 1 ? ` ${counter}` : ""})`;
    name = `${source.name.slice(0, 40 - suffix.length).trimEnd()}${suffix}`;
    counter++;
  } while (data.sets.some(set => set.name.toLocaleLowerCase() === name.toLocaleLowerCase()));
  const duplicate = { ...source, id: newId, name, items: source.items.map(item => ({ ...item, id: itemId(), catalogId: productForItem(item)?.id ?? null })) };
  return { ...data, sets: [...data.sets, duplicate] };
}
