export type ToastKind = "success" | "error" | "loading" | "info";
export type ToastAction = { label: string; onClick: () => boolean | void };
export type ToastOptions = { id?: string; values?: Record<string, string | number>; action?: ToastAction; duration?: number | null };
export type ToastNotice = ToastOptions & { id: string; kind: ToastKind; message: string; revision: number; duration: number | null };

/** A bounded queue shared by screens, so feedback survives navigation. */
export function createToastQueue() {
  let notices: ToastNotice[] = [];
  let revision = 0;
  const listeners = new Set<() => void>();
  function publish() { listeners.forEach(listener => listener()); }
  return {
    getSnapshot: () => notices,
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    push(kind: ToastKind, message: string, options: ToastOptions = {}) {
      const currentRevision = ++revision;
      const id = options.id ?? `toast-${currentRevision}`;
      const duration = options.duration !== undefined ? options.duration : kind === "error" || kind === "loading" ? null : 8000;
      notices = [...notices.filter(notice => notice.id !== id), { ...options, id, kind, message, duration, revision: currentRevision }].slice(-3);
      publish();
      return id;
    },
    dismiss(id: string) {
      const next = notices.filter(notice => notice.id !== id);
      if (next.length === notices.length) return;
      notices = next;
      publish();
    },
  };
}
