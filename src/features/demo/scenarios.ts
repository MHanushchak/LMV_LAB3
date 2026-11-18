import { initialData, STORAGE_KEY, parseData } from "../sets/model.ts";
import { createDraft, emptyDrafts, DRAFTS_KEY, parseDrafts } from "../drafts/model.ts";
import { defaultPreferences, PREFERENCES_KEY, parsePreferences } from "../settings/model.ts";
import { CART_KEY } from "../cart/model.ts";
import type { DemoSession, ScenarioId } from "./sandbox.ts";

export const scenarios: { id: ScenarioId; title: string; description: string; href: string; steps: string[]; expected: string }[] = [
  { id: "complete-basket", title: "Compare and save a basket", description: "Choose a complete offer and keep the basket after a reload.", href: "/compare?set=weekly-diet", steps: ["Review ATB and Varus. Only the complete offer has Best Value.", "Open the Varus basket and confirm it.", "Reload Cart: the basket and quantities should remain."], expected: "Varus: 238 UAH for all three products." },
  { id: "missing-product", title: "Resolve an unavailable product", description: "Compare a partial basket, choose a replacement, and check the new total.", href: "/compare?set=weekly-diet", steps: ["Open Resolve missing items at ATB.", "Replace milk with lactose-free milk.", "Confirm the basket and check the cart total."], expected: "ATB: 143 UAH before replacement, 239 UAH after replacement." },
  { id: "search-validation", title: "Search and validate quantities", description: "Recover from an empty search and correct invalid input.", href: "/sets/weekly-diet", steps: ["The saved search for Avocado has no matches. Reset Filters.", "Choose Rolled oats, enter quantity 0, and try to save.", "Correct the quantity to 1 and save the item."], expected: "The invalid item is not saved. With 1 kg added, the set estimate is 310 UAH." },
  { id: "first-set", title: "Create your first set", description: "Start with an empty list and build a reusable shopping set.", href: "/sets", steps: ["Create a set named Breakfast. Try an empty name first.", "Open the new set, add Eggs from the catalog, quantity 10, and save.", "Compare stores, review a complete basket, and confirm."], expected: "One set with 10 eggs. ATB: 65 UAH, Varus: 68 UAH." },
];
export function createScenarioSession(id: ScenarioId): DemoSession {
  if (!scenarios.some(s => s.id === id)) throw new Error("Unknown scenario.");
  const data = initialData();
  if (id === "first-set") data.sets = [];
  const drafts = emptyDrafts();
  if (id === "search-validation") {
    const draft = createDraft({ kind: "item", setId: "weekly-diet" }, data.sets[0]);
    if (draft.kind === "item") draft.query = "Avocado";
    drafts.editors["/sets/weekly-diet"] = draft;
  }
  const preferences = { ...defaultPreferences(), storeIds: ["atb", "varus"] };
  const values = {
    [STORAGE_KEY]: JSON.stringify(data),
    [DRAFTS_KEY]: JSON.stringify(drafts),
    [PREFERENCES_KEY]: JSON.stringify(preferences),
    [CART_KEY]: "null",
    "smartbasket.locale.v1": "uk",
  };
  // Validate all prepared data before the sandbox is published in one write.
  parseData(values[STORAGE_KEY]); parseDrafts(values[DRAFTS_KEY]); parsePreferences(values[PREFERENCES_KEY]);
  return { version: 1, scenarioId: id, values };
}
