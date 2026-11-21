"use client";

import { toast } from "../notifications/store";
import { createLocalStore } from "@/src/lib/local-store";
import { PREFERENCES_KEY, defaultPreferences, parsePreferences } from "./model";
const store = createLocalStore(PREFERENCES_KEY, defaultPreferences(), parsePreferences, { readError: "Preferences could not be read. Check browser storage and retry.", writeError: "Preferences could not be saved. Check browser storage and retry." });
export const usePreferences = store.useStore;
export function updatePreferences(updater: Parameters<typeof store.update>[0]) {
  const saved = store.update(updater);
  if (saved) toast.success("Preferences saved.", { id: "preferences-saved" });
  return saved;
}
export const retryPreferences = store.retry;
