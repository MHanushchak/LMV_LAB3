"use client";

import { useLocale } from "@/src/i18n/locale";

import { useErrorToast } from "@/src/features/notifications/store";
import { Button } from "./button";
import { type UIState } from "./styles";

export type ErrorStateProps = { title?: string; description: string; onRetry: () => void; state?: UIState };
export function ErrorState({ title = "Something went wrong", description, onRetry, state = "Error" }: ErrorStateProps) {
  const { t } = useLocale();
  const retry = useErrorToast(description, onRetry);
  return (
    <section className="flex flex-col gap-2" aria-label={t(title)}>
      <Button variant="secondary" aria-label={t("Retry: {title}", { title: t(title) })} onClick={retry} loading={state === "Loading"} disabled={state === "Disabled"}>{t("Retry")}</Button>
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
