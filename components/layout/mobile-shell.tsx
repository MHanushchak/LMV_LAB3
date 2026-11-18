"use client";

import { useLocale } from "@/src/i18n/locale";

import type { ReactNode } from "react";
import { BatteryFull, Wifi } from "lucide-react";
import { AppHeader } from "./app-header";
import { BottomNavigation } from "./bottom-navigation";
import type { LayoutState } from "./layout-state";
import { Loading, Error as ErrorState, Empty, Disabled } from "./screen-states";
import { DemoBanner } from "@/src/features/demo/demo-banner";
import { UndoNotifications } from "@/src/features/sets/undo-notifications";

export function MobileShell({ children, state = "Default" }: { children?: ReactNode; state?: LayoutState }) {
  const { t } = useLocale();
  return (
    <div className="mobile-shell relative mx-auto flex w-full max-w-[430px] flex-col overflow-hidden rounded-[48px] border-[8px] border-slate-800 bg-slate-50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]" data-state={state}>
      <a href="#main-content" className="sr-only shrink-0 bg-white p-4 text-primary-700 focus:not-sr-only">{t("Skip to content")}</a>
      <div aria-hidden="true" className="flex h-14 shrink-0 items-center justify-between gap-2 bg-white px-6 text-neutral-900">
        <span className="w-12 text-center text-body-sm font-semibold">9:41</span>
        <span className="flex h-7 w-24 shrink-0 items-center justify-end rounded-full bg-neutral-900 px-2">
          <span className="h-2 w-2 rounded-full bg-slate-800" />
        </span>
        <span className="flex w-12 items-center justify-end">
          <Wifi className="h-6 w-6 shrink-0" strokeWidth={2} />
          <BatteryFull className="h-6 w-6 shrink-0" strokeWidth={2} />
        </span>
      </div>
      <AppHeader state={state} />
      <DemoBanner />
      <main id="main-content" tabIndex={-1} aria-busy={state === "Loading"} className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto overscroll-y-contain p-6">
        {state === "Default" && children}
        {state === "Loading" && <Loading />}
        {state === "Error" && <ErrorState />}
        {state === "Empty" && <Empty />}
        {state === "Disabled" && <Disabled />}
      </main>
      <UndoNotifications />
      <BottomNavigation state={state} />
      <div aria-hidden="true" className="flex h-8 shrink-0 items-center justify-center bg-white">
        <span className="h-1 w-32 rounded-full bg-slate-300" />
      </div>
    </div>
  );
}

export const MobileShellStates = {
  Default: MobileShell,
  Loading: () => <MobileShell state="Loading" />,
  Error: () => <MobileShell state="Error" />,
  Disabled: () => <MobileShell state="Disabled" />,
  Empty: () => <MobileShell state="Empty" />,
};
