"use client";

import { appStorage } from "@/src/lib/app-storage";

import { useSyncExternalStore } from "react";
import { STORAGE_KEY, initialData, parseData, type SetsData } from "./model";

type Snapshot = { loaded: boolean; data: SetsData; error: string | null };
const serverSnapshot: Snapshot = { loaded: false, data: { version: 1, sets: [], pending: [] }, error: null };
let snapshot = serverSnapshot;
let initialized = false;
const listeners = new Set<() => void>();
function emit() { listeners.forEach(listener => listener()); }
function load() {
  try {
    const raw = appStorage().getItem(STORAGE_KEY);
    const data = raw === null ? initialData() : parseData(raw);
    if (raw === null) appStorage().setItem(STORAGE_KEY, JSON.stringify(data));
    snapshot = { loaded: true, data, error: null };
  } catch {
    snapshot = { ...snapshot, loaded: true, error: "Saved sets could not be read. Check browser storage access and retry. Existing saved data has not been replaced." };
  }
  emit();
}
function onStorage(event: StorageEvent) {
  if (event.key === STORAGE_KEY || event.key === null) load();
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!initialized) {
    initialized = true;
    load();
  }
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) window.removeEventListener("storage", onStorage);
  };
}
export function retryStorage() { load(); }
export function updateSets(updater: (data: SetsData) => SetsData): boolean {
  if (!snapshot.loaded || snapshot.error) return false;
  try {
    // Read the latest persisted version before each mutation to avoid stale-tab writes.
    const raw = appStorage().getItem(STORAGE_KEY);
    const current = raw === null ? snapshot.data : parseData(raw);
    const data = updater(current);
    parseData(JSON.stringify(data));
    appStorage().setItem(STORAGE_KEY, JSON.stringify(data));
    snapshot = { loaded: true, data, error: null };
    emit();
    return true;
  } catch {
    snapshot = { ...snapshot, error: "Changes could not be saved. Check browser storage access, then Retry before trying your change again." };
    emit();
    return false;
  }
}
export function useSets() {
  return useSyncExternalStore(subscribe, () => snapshot, () => serverSnapshot);
}
