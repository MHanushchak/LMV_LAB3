import { scopedStorage } from "../features/demo/sandbox.ts";

/** Called only by client stores after hydration or by user event handlers. */
export function appStorage() {
  return scopedStorage(window.localStorage, window.sessionStorage);
}
