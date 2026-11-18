"use client";

import { useLocale } from "@/src/i18n/locale";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import type { LayoutState } from "./layout-state";

export function AppHeader({ state = "Default" }: { state?: LayoutState }) {
  return <Suspense fallback={<HeaderContent state="Loading" title="SmartBasket" />}><PathHeader state={state} /></Suspense>;
}
function PathHeader({ state }: { state: LayoutState }) {
  const pathname = usePathname();
  const titles: Record<string, string> = { "/": "SmartBasket", "/sets": "My Sets", "/compare": "Where Cheaper", "/cart": "Cart", "/settings": "Settings", "/demo": "Demo scenarios" };
  const title = titles[`/${pathname.split("/")[1]}`] ?? "SmartBasket";
  return <HeaderContent state={state} title={pathname.startsWith("/sets/") ? "Set details" : title} />;
}
function HeaderContent({ state, title }: { state: LayoutState; title: string }) {
  const { t } = useLocale();
  const unavailable = state === "Disabled" || state === "Loading";
  const brand = (
    <>
      <ShoppingBasket className="h-6 w-6 text-primary-700" strokeWidth={2} aria-hidden="true" />
      <span className="text-h4">{t(title)}</span>
    </>
  );

  return (
    <header className="sticky top-0 z-10 flex shrink-0 flex-col border-b border-neutral-300 bg-white" data-state={state}>
      <div className="flex h-16 items-center justify-between gap-4 px-4">
        {unavailable ? (
          <span className="flex min-h-11 items-center gap-2 text-neutral-600" aria-disabled="true">{brand}</span>
        ) : (
          <Link href="/" aria-label={`${t(title)} — ${t("SmartBasket home")}`} className="flex min-h-11 items-center gap-2 rounded-[10px] px-2 hover:bg-primary-100 active:bg-primary-100/70 focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2">{brand}</Link>
        )}
        {state === "Loading" && <LoaderCircle className="h-6 w-6 text-primary-700 motion-safe:animate-spin" aria-label={t("Loading")} role="status" />}
        {state === "Error" && <span className="text-caption text-status-error">{t("Connection error")}</span>}
      </div>
    </header>
  );
}

export const AppHeaderStates = {
  Default: AppHeader,
  Loading: () => <AppHeader state="Loading" />,
  Error: () => <AppHeader state="Error" />,
  Disabled: () => <AppHeader state="Disabled" />,
  Empty: () => <AppHeader state="Empty" />,
};
