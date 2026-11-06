import { Suspense } from "react";
import type { Metadata } from "next";
import "@fontsource-variable/inter";
import { MobileShell } from "@/components/layout/mobile-shell";
import "./globals.css";
import { LocaleEffects } from "@/src/i18n/locale";

export const metadata: Metadata = {
  title: { default: "SmartBasket", template: "%s | SmartBasket" },
  description: "Save your meal sets, compare grocery baskets, and shop with confidence.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-screen min-h-dvh items-center justify-center px-2 py-8 sm:px-8">
        <Suspense fallback={null}><LocaleEffects /></Suspense>
        <MobileShell>{children}</MobileShell>
      </body>
    </html>
  );
}
