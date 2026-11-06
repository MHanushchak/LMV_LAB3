"use client";

import { createLocalStore } from "@/src/lib/local-store";
import { PREFERENCES_KEY, defaultPreferences, parsePreferences } from "./model";
const store = createLocalStore(PREFERENCES_KEY, defaultPreferences(), parsePreferences, { readError: "Preferences could not be read. Check browser storage and retry.", writeError: "Preferences could not be saved. Check browser storage and retry." });
export const usePreferences = store.useStore;
export const updatePreferences = store.update;
export const retryPreferences = store.retry;
