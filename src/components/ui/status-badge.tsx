"use client";

import { useLocale } from "@/src/i18n/locale";

import { Check, CircleHelp, LoaderCircle, Sparkles, X } from "lucide-react";
import type { UIState } from "./styles";

const statuses = {
  "in-stock": { label: "In Stock", icon: Check, color: "text-status-success" },
  "out-of-stock": { label: "Out of Stock", icon: X, color: "text-status-error" },
  "best-value": { label: "Best Value", icon: Sparkles, color: "text-secondary-700" },
};
type Props = { status?: keyof typeof statuses; state?: UIState };
export function StatusBadge({ status = "in-stock", state = "Default" }: Props) {
  const { t } = useLocale();
  const value = state === "Error" ? statuses["out-of-stock"] : statuses[status];
  const Icon = state === "Loading" ? LoaderCircle : state === "Empty" ? CircleHelp : value.icon;
  const label = state === "Loading" ? "Checking stock…" : state === "Empty" ? "No status" : value.label;
  return <span role={state === "Loading" ? "status" : undefined} className={`inline-flex items-center gap-2 rounded-full bg-white px-2 py-1 text-body-sm font-semibold ${state === "Disabled" ? "text-neutral-600" : value.color}`}><Icon aria-hidden="true" className={`h-6 w-6 shrink-0 ${state === "Loading" ? "motion-safe:animate-spin" : ""}`} strokeWidth={2} />{t(label)}</span>;
}
export const StatusBadgeStates = {
  Default: StatusBadge,
  Loading: () => <StatusBadge state="Loading" />,
  Error: () => <StatusBadge state="Error" />,
  Empty: () => <StatusBadge state="Empty" />,
  Disabled: () => <StatusBadge state="Disabled" />,
};
