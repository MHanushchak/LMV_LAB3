"use client";

import { useSyncExternalStore } from "react";

type Options = { readError?: string; writeError?: string; memoryFallback?: boolean };
/** Versioned browser state with stable SSR snapshots, fresh writes, and recovery. */
export function createLocalStore<T>(key: string, empty: T, parse: (raw: string) => T, options: Options = {}) {
  const initial = { loaded: false, value: empty, error: null as string | null };
  let snapshot = initial;
  let initialized = false;
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach(listener => listener());
  function load() {
    try {
      const raw = localStorage.getItem(key);
      snapshot = { loaded: true, value: raw === null ? empty : parse(raw), error: null };
    } catch {
      snapshot = { ...snapshot, loaded: true, error: options.readError ?? "The saved basket could not be read. Check storage access and retry. Saved data has not been replaced." };
    }
    emit();
  }
  function onStorage(event: StorageEvent) { if (event.key === key || event.key === null) load(); }
  function subscribe(listener: () => void) {
    listeners.add(listener);
    if (!initialized) { initialized = true; load(); }
    if (listeners.size === 1) window.addEventListener("storage", onStorage);
    return () => { listeners.delete(listener); if (!listeners.size) window.removeEventListener("storage", onStorage); };
  }
  function update(updater: (value: T) => T) {
    if (!snapshot.loaded || (snapshot.error && !options.memoryFallback)) return false;
    let validated: T | undefined;
    try {
      // Keep editing in memory after a storage failure until an explicit retry.
      if (snapshot.error && options.memoryFallback) {
        validated = parse(JSON.stringify(updater(snapshot.value)));
        snapshot = { ...snapshot, value: validated };
        emit();
        return false;
      }
      const raw = localStorage.getItem(key);
      const current = raw === null ? snapshot.value : parse(raw);
      validated = parse(JSON.stringify(updater(current)));
      localStorage.setItem(key, JSON.stringify(validated));
      snapshot = { loaded: true, value: validated, error: null };
      emit();
      return true;
    } catch {
      snapshot = { ...snapshot, value: options.memoryFallback && validated !== undefined ? validated : snapshot.value, error: options.writeError ?? "The basket could not be saved. Check storage access, then Retry and try again." };
      emit();
      return false;
    }
  }
  function retry() {
    if (options.memoryFallback && snapshot.error) {
      try {
        localStorage.setItem(key, JSON.stringify(snapshot.value));
        snapshot = { ...snapshot, error: null };
        emit();
      } catch { /* Preserve the in-memory draft and its existing error. */ }
    } else load();
  }
  function useStore() { return useSyncExternalStore(subscribe, () => snapshot, () => initial); }
  return { useStore, save: (value: T) => update(() => value), update, retry };
}
