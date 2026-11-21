"use client";

import { useLocale } from "@/src/i18n/locale";

import { Suspense, useLayoutEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppHeader } from "./app-header";
import { BottomNavigation } from "./bottom-navigation";
import type { LayoutState } from "./layout-state";
import { Loading, Error as ErrorState, Empty, Disabled } from "./screen-states";
import { DemoBanner } from "@/src/features/demo/demo-banner";
import { Toaster } from "@/src/features/notifications/toaster";
import { UndoNotifications } from "@/src/features/sets/undo-notifications";

export function MobileShell({ children, state = "Default" }: { children?: ReactNode; state?: LayoutState }) {
  const { t } = useLocale();
  return (
    <div className="mobile-shell relative mx-auto flex w-full max-w-[430px] flex-col overflow-hidden bg-slate-50" data-state={state}>
      <a href="#main-content" className="sr-only shrink-0 bg-white p-4 text-primary-700 focus:not-sr-only">{t("Skip to content")}</a>
      <AppHeader state={state} />
      <DemoBanner />
      <Suspense fallback={null}><RouteScroll /></Suspense>
      <main id="main-content" tabIndex={-1} aria-busy={state === "Loading"} className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-y-contain p-4">
        {state === "Default" && children}
        {state === "Loading" && <Loading />}
        {state === "Error" && <ErrorState />}
        {state === "Empty" && <Empty />}
        {state === "Disabled" && <Disabled />}
      </main>
      <div id="screen-actions" className="shrink-0" />
      <UndoNotifications />
      <Toaster />
      <BottomNavigation state={state} />
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

// Next's window scroll handling cannot reset an independently scrolling main.
function RouteScroll() {
  const pathname = usePathname();
  const positions = useRef(new Map<string, number>());
  const historyNavigation = useRef(false);
  useLayoutEffect(() => {
    const onPopState = () => {
      historyNavigation.current = true;
      const top = positions.current.get(window.location.pathname) ?? 0;
      requestAnimationFrame(() => {
        document.getElementById("main-content")?.scrollTo({ top });
        historyNavigation.current = false;
      });
    };
    window.addEventListener("popstate", onPopState, true);
    return () => window.removeEventListener("popstate", onPopState, true);
  }, []);
  useLayoutEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;
    const savedPositions = positions.current;
    const targetTop = historyNavigation.current ? savedPositions.get(pathname) ?? 0 : 0;
    historyNavigation.current = false;
    let restoring = targetTop > 0;
    let userInteraction = false;
    const restore = () => {
      main.scrollTop = targetTop;
      if (main.scrollHeight - main.clientHeight >= targetTop) {
        restoring = false;
        observer.disconnect();
      }
    };
    const observer = new MutationObserver(restore);
    if (restoring) observer.observe(main, { childList: true, subtree: true });
    const frame = requestAnimationFrame(restore);
    const savePosition = () => { if (userInteraction && !restoring && window.location.pathname === pathname) savedPositions.set(pathname, main.scrollTop); };
    const stopRestoring = () => { userInteraction = true; restoring = false; observer.disconnect(); };
    main.addEventListener("scroll", savePosition, { passive: true });
    main.addEventListener("pointerdown", stopRestoring);
    main.addEventListener("keydown", stopRestoring);
    main.addEventListener("wheel", stopRestoring, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      main.removeEventListener("scroll", savePosition);
      main.removeEventListener("pointerdown", stopRestoring);
      main.removeEventListener("keydown", stopRestoring);
      main.removeEventListener("wheel", stopRestoring);
    };
  }, [pathname]);
  return null;
}
