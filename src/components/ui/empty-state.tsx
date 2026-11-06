"use client";

import { useLocale } from "@/src/i18n/locale";

import { ListChecks, LoaderCircle, type LucideIcon } from "lucide-react";
import { Button, ButtonLink } from "./button";
import { panelStyles, type UIState } from "./styles";

type Action = { label: string; href: string; onClick?: never } | { label: string; onClick: () => void; href?: never };
export type EmptyStateProps = { title: string; description: string; action: Action; icon?: LucideIcon; state?: UIState };
export function EmptyState({ title, description, action, icon: Icon = ListChecks, state = "Default" }: EmptyStateProps) {
  const { t } = useLocale();
  return (
    <section className={`${panelStyles} items-center text-center`} aria-busy={state === "Loading"}>
      {state === "Loading" ? <LoaderCircle className="h-6 w-6 text-primary-700 motion-safe:animate-spin" aria-hidden="true" /> : <Icon className="h-6 w-6 text-primary-700" strokeWidth={2} aria-hidden="true" />}
      <h2 className="max-w-full break-words text-h4">{t(title)}</h2>
      <p className="text-body text-neutral-600">{t(description)}</p>
      {action.href && state !== "Loading" && state !== "Disabled" ? <ButtonLink href={action.href} className="w-full">{action.label}</ButtonLink> : <Button onClick={action.onClick} loading={state === "Loading"} disabled={state === "Disabled"} className="w-full">{action.label}</Button>}
    </section>
  );
}
export const EmptyStateStates = {
  Default: EmptyState,
  Empty: EmptyState,
  Loading: (props: EmptyStateProps) => <EmptyState {...props} state="Loading" />,
  Disabled: (props: EmptyStateProps) => <EmptyState {...props} state="Disabled" />,
  Error: (props: EmptyStateProps) => <EmptyState {...props} state="Error" />,
};
