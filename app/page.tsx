"use client";

import { useLocale } from "@/src/i18n/locale";
import { retryStorage, useSets } from "@/src/features/sets/store";
import { setTotal } from "@/src/features/sets/model";
import { ErrorState } from "@/src/components/ui";
import { Loading } from "@/components/layout/screen-states";

import { ButtonLink } from "@/src/components/ui/button";
import { ArrowRight, ListChecks } from "lucide-react";

export default function Home() {
  const { t, money } = useLocale();
  const { data, loaded, error } = useSets();
  const recentSet = data.sets[0];
  return (
    <section className="flex flex-col gap-8" aria-labelledby="home-title">
      <header className="flex flex-col gap-2">
        <p className="text-body-sm text-neutral-600">{t("Your weekly routine, simplified")}</p>
        <h1 id="home-title" className="text-h1">{t("A smarter way to fill your basket.")}</h1>
        <p className="text-body text-neutral-600">
          {t("Keep your meal plans in reusable sets. Compare prices across ATB, Silpo, and Varus when you’re ready to shop.")}</p>
      </header>
      {!loaded ? <Loading /> : error ? <ErrorState description={error} onRetry={retryStorage} /> : <article className="flex flex-col gap-4 rounded-2xl border border-neutral-300 bg-white p-4">
        <ListChecks className="h-6 w-6 text-primary-700" strokeWidth={2} aria-hidden="true" />
        <p className="text-body-sm text-neutral-600">{t(recentSet ? "Your saved set" : "Start with your sets")}</p>
        <h2 className="break-words text-h4">{recentSet?.name ?? t("Start with your sets")}</h2>
        <p className="text-body text-neutral-600">
          {recentSet ? t(recentSet.items.length === 1 ? "{count} item · Estimated total" : "{count} items · Estimated total", { count: recentSet.items.length }) : t("Save the groceries and exact quantities you buy every week in one place.")}</p>
        {recentSet && <output aria-label={t("{name} estimated total", { name: recentSet.name })} className="text-h3">{money(setTotal(recentSet))}</output>}
        <ButtonLink href={recentSet ? `/sets/${encodeURIComponent(recentSet.id)}` : "/sets"}>
          {t(recentSet ? "Open set" : "Create First Set")}<ArrowRight className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
        </ButtonLink>
      </article>}
      <ButtonLink href="/demo" variant="text">{t("Demo scenarios")}</ButtonLink>
    </section>
  );
}
