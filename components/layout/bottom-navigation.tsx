"use client";

import { useLocale } from "@/src/i18n/locale";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { ChartNoAxesColumn, House, ListChecks, Settings, ShoppingCart } from "lucide-react";
import type { LayoutState } from "./layout-state";

const destinations = [
  { href: "/", label: "Home", icon: House },
  { href: "/sets", label: "My Sets", icon: ListChecks },
  { href: "/compare", label: "Where Cheaper", icon: ChartNoAxesColumn },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function BottomNavigation({ state = "Default" }: { state?: LayoutState }) {
  return <Suspense fallback={<NavigationContent state="Loading" pathname="" />}><PathNavigation state={state} /></Suspense>;
}
function PathNavigation({ state }: { state: LayoutState }) {
  const pathname = usePathname();
  return <NavigationContent state={state} pathname={pathname} />;
}
function NavigationContent({ state, pathname }: { state: LayoutState; pathname: string }) {
  const { t } = useLocale();
  const unavailable = state === "Disabled" || state === "Loading";

  return (
    <nav aria-label={t("Main navigation")} aria-busy={state === "Loading"} data-state={state} className="sticky bottom-0 z-10 flex shrink-0 flex-col border-t border-neutral-300 bg-white pb-[env(safe-area-inset-bottom)]">
      <ul className="flex min-h-16 flex-row items-stretch gap-1 px-2 py-2">
        {destinations.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
          const className = `flex min-h-12 min-w-11 flex-1 select-none flex-col items-center justify-center gap-1 rounded-[10px] px-1 text-center text-caption ${unavailable ? "pointer-events-none bg-neutral-300 text-neutral-600" : active ? "bg-primary-100 font-semibold text-primary-700" : "text-neutral-600 hover:bg-primary-100 hover:text-primary-700"} active:bg-primary-100/70 focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2`;
          const content = <><Icon className="h-6 w-6 shrink-0" strokeWidth={2} aria-hidden="true" /><span className="max-w-full break-words">{t(label)}</span></>;

          return (
            <li key={href} className="flex min-w-0 flex-1">
              {unavailable ? <span aria-disabled="true" className={className}>{content}</span> : <Link scroll={false} href={href} aria-current={active ? "page" : undefined} className={className}>{content}</Link>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export const BottomNavigationStates = {
  Default: BottomNavigation,
  Loading: () => <BottomNavigation state="Loading" />,
  Error: () => <BottomNavigation state="Error" />,
  Disabled: () => <BottomNavigation state="Disabled" />,
  Empty: () => <BottomNavigation state="Empty" />,
};
