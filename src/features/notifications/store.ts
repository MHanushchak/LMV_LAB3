"use client";

import { useCallback, useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createToastQueue, type ToastNotice, type ToastOptions } from "./model";

const queue = createToastQueue();
const serverSnapshot: ToastNotice[] = [];
export const toast = {
  success: (message: string, options?: ToastOptions) => queue.push("success", message, options),
  error: (message: string, options?: ToastOptions) => queue.push("error", message, options),
  loading: (message: string, options?: ToastOptions) => queue.push("loading", message, options),
  info: (message: string, options?: ToastOptions) => queue.push("info", message, options),
  dismiss: queue.dismiss,
};
export function useToasts() { return useSyncExternalStore(queue.subscribe, queue.getSnapshot, () => serverSnapshot); }

// Avoid flashing a loading notice for synchronous local-storage operations.
export function useLoadingToast(message = "Loading your basket…") {
  const id = useId();
  useEffect(() => {
    const timer = window.setTimeout(() => toast.loading(message, { id }), 300);
    return () => { window.clearTimeout(timer); toast.dismiss(id); };
  }, [id, message]);
}
export function useErrorToast(message: string, retry: () => void) {
  const action = useRef(retry);
  useEffect(() => { action.current = retry; }, [retry]);
  const retryWithFeedback = useCallback(function retryAction() {
    toast.error(message, { id: `error:${message}`, action: { label: "Retry", onClick: retryAction } });
    action.current();
    return false;
  }, [message]);
  useEffect(() => {
    const id = `error:${message}`;
    toast.error(message, { id, action: { label: "Retry", onClick: retryWithFeedback } });
    return () => toast.dismiss(id);
  }, [message, retryWithFeedback]);
  return retryWithFeedback;
}
