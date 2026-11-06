"use client";

import { useLocale } from "@/src/i18n/locale";

import { CircleAlert } from "lucide-react";
import { Button } from "./button";
import { panelStyles, type UIState } from "./styles";

export type ErrorStateProps = { title?: string; description: string; onRetry: () => void; state?: UIState };
export function ErrorState({ title = "Something went wrong", description, onRetry, state = "Error" }: ErrorStateProps) {
  const { t } = useLocale();
  return (
    <section role="alert" className={panelStyles}>
      <div className="flex items-start gap-2"><CircleAlert className="h-6 w-6 shrink-0 text-status-error" strokeWidth={2} aria-hidden="true" /><h2 className="text-h6">{t(title)}</h2></div>
      <p className="text-body-sm text-neutral-600">{t(description)}</p>
      <Button variant="secondary" onClick={onRetry} loading={state === "Loading"} disabled={state === "Disabled"}>{t("Retry")}</Button>
    </section>
  );
}
export const ErrorStateStates = {
  Default: ErrorState,
  Error: ErrorState,
  Loading: (props: ErrorStateProps) => <ErrorState {...props} state="Loading" />,
  Disabled: (props: ErrorStateProps) => <ErrorState {...props} state="Disabled" />,
  Empty: (props: ErrorStateProps) => <ErrorState {...props} description="No error details available." />,
};
