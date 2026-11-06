"use client";

import { useLocale } from "@/src/i18n/locale";

import { ButtonLink } from "@/src/components/ui/button";
import { ArrowRight, ListChecks } from "lucide-react";

export default function Home() {
  const { t } = useLocale();
  return (
    <section className="flex flex-col gap-8" aria-labelledby="home-title">
      <header className="flex flex-col gap-2">
        <p className="text-body-sm text-neutral-600">{t("Your weekly routine, simplified")}</p>
        <h1 id="home-title" className="text-h1">{t("A smarter way to fill your basket.")}</h1>
        <p className="text-body text-neutral-600">
          {t("Keep your meal plans in reusable sets. Compare prices across ATB, Silpo, and Varus when you’re ready to shop.")}</p>
      </header>
      <article className="flex flex-col gap-4 rounded-2xl border border-neutral-300 bg-white p-6">
        <ListChecks className="h-6 w-6 text-primary-700" strokeWidth={2} aria-hidden="true" />
        <h2 className="text-h4">{t("Start with your sets")}</h2>
        <p className="text-body text-neutral-600">
          {t("Save the groceries and exact quantities you buy every week in one place.")}</p>
        <ButtonLink href="/sets">
          {t("Go to My Sets")}<ArrowRight className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
        </ButtonLink>
      </article>
    </section>
  );
}
