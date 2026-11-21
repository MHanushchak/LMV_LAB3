"use client";

import { useEffect, useRef, useState } from "react";
import { CircleAlert, CircleCheck, Info, LoaderCircle, X } from "lucide-react";
import { useLocale } from "@/src/i18n/locale";
import { Button } from "@/src/components/ui/button";
import { toast, useToasts } from "./store";
import type { ToastNotice } from "./model";

const icons = { success: CircleCheck, error: CircleAlert, loading: LoaderCircle, info: Info };
const colors = { success: "border-status-success text-status-success", error: "border-status-error text-status-error", loading: "border-primary-700 text-primary-700", info: "border-status-info text-status-info" };

export function ToastCard({ notice }: { notice: ToastNotice }) {
  const { t } = useLocale();
  const [paused, setPaused] = useState(false);
  const Icon = icons[notice.kind];
  useEffect(() => {
    if (paused || notice.duration === null) return;
    const timer = window.setTimeout(() => toast.dismiss(notice.id), notice.duration);
    return () => window.clearTimeout(timer);
  }, [notice.id, notice.revision, notice.duration, paused]);
  return <article role={notice.kind === "error" ? "alert" : "status"} aria-atomic="true" data-toast-kind={notice.kind}
    onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
    className={`pointer-events-auto flex min-w-0 items-start gap-2 rounded-2xl border bg-white p-3 shadow-lg ${colors[notice.kind]}`}>
    <Icon aria-hidden="true" className={`mt-2 h-6 w-6 shrink-0 ${notice.kind === "loading" ? "motion-safe:animate-spin" : ""}`} strokeWidth={2} />
    <div className="flex min-h-11 min-w-0 flex-1 flex-col justify-center gap-1">
      <p className="break-words text-body-sm font-semibold text-neutral-900">{t(notice.message, notice.values)}</p>
      {notice.action && <Button variant="text" className="self-start" onClick={() => { if (notice.action!.onClick() !== false) toast.dismiss(notice.id); }}>{t(notice.action.label)}</Button>}
    </div>
    <Button variant="text" className="w-11 shrink-0 px-0" aria-label={t("Dismiss notification")} onClick={() => toast.dismiss(notice.id)}><X aria-hidden="true" className="h-5 w-5" /></Button>
  </article>;
}

export function Toaster() {
  const { t } = useLocale();
  const notices = useToasts();
  const root = useRef<HTMLDivElement>(null);
  const latestRevision = notices.at(-1)?.revision;
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    // Native popovers also appear above a modal basket review, without taking focus.
    if (node.matches(":popover-open")) node.hidePopover();
    if (notices.length) node.showPopover();
  }, [notices.length, latestRevision]);
  return <div ref={root} popover="manual" aria-label={t("Notifications")} className="toast-region">
    {notices.map(notice => <ToastCard key={notice.id} notice={notice} />)}
  </div>;
}

export const ToastCardStates = {
  Default: ToastCard,
  Loading: () => <ToastCard notice={{ id: "preview", kind: "loading", message: "Loading your basket…", revision: 0, duration: null }} />,
  Error: () => <ToastCard notice={{ id: "preview", kind: "error", message: "Something went wrong", revision: 0, duration: null }} />,
  Empty: () => null,
};
