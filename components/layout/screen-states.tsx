"use client";

import { useLocale } from "@/src/i18n/locale";

import type { ReactNode } from "react";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import { Button, ButtonLink, EmptyState, ErrorState } from "@/src/components/ui";
import { useLoadingToast } from "@/src/features/notifications/store";
import { panelStyles } from "@/src/components/ui/styles";

export function Default({ children }: { children: ReactNode }) {
  return <section className="flex flex-col gap-4">{children}</section>;
}
export function Loading() {
  const { t } = useLocale();
  useLoadingToast();
  return (
    <section role="status" className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-neutral-600">
      <LoaderCircle className="h-6 w-6 text-primary-700 motion-safe:animate-spin" strokeWidth={2} aria-hidden="true" />
      <p className="sr-only">{t("Loading your basket…")}</p>
    </section>
  );
}
export function Error({ onRetry }: { onRetry?: () => void }) {
  const { t } = useLocale();
  return <ErrorState title={t("Unable to load this screen")} description={t("Check your connection and try again.")} onRetry={onRetry ?? (() => window.location.reload())} />;
}
export function Empty({ title = "No saved sets yet", description = "Your reusable shopping sets will appear here." }: { title?: string; description?: string }) {
  const { t } = useLocale();
  return <EmptyState title={title} description={description} action={{ label: t("Go to My Sets"), href: "/sets" }} />;
}
export function Disabled() {
  const { t } = useLocale();
  return (
    <section className={panelStyles}>
      <LockKeyhole className="h-6 w-6 text-neutral-600" strokeWidth={2} aria-hidden="true" />
      <h2 className="text-h4">{t("Currently unavailable")}</h2>
      <p className="text-neutral-600">{t("This action is not available yet.")}</p>
      <Button disabled>{t("Unavailable")}</Button>
      <ButtonLink href="/" variant="text">{t("Back to Home")}</ButtonLink>
    </section>
  );
}
