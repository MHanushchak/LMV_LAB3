"use client";

import { useLocale } from "@/src/i18n/locale";
import { retryStorage, useSets } from "@/src/features/sets/store";
import { setTotal } from "@/src/features/sets/model";
import { ErrorState } from "@/src/components/ui";
import { Loading } from "@/components/layout/screen-states";

import { useRouter } from "next/navigation";
import { createDraft } from "@/src/features/drafts/model";
import { putEditor, retryDrafts, useDrafts } from "@/src/features/drafts/store";
import { Button, ButtonLink } from "@/src/components/ui/button";
import { ArrowRight, ListChecks } from "lucide-react";

export default function Home() {
  const { t, money } = useLocale();
  const { data, loaded, error } = useSets();
  const recentSet = data.sets[0];
  const drafts = useDrafts();
  const router = useRouter();
  function createSet() {
    if (!drafts.value.editors["/sets"] && !putEditor("/sets", createDraft({ kind: "set" }))) return;
    router.push("/sets", { scroll: false });
  }
  return (
    <section className="grid gap-4 md:grid-cols-2 md:items-start" aria-labelledby="home-title">
      <header className="flex flex-col gap-2 md:col-span-2">
        <p className="text-body-sm text-neutral-600">{t("Your weekly routine, simplified")}</p>
        <h1 id="home-title" className="text-h2">{t("A smarter way to fill your basket.")}</h1>
        <p className="text-body text-neutral-600">
          {t("Save a set. Compare stores. Shop for less.")}</p>
      </header>
      {!loaded ? <Loading /> : error ? <ErrorState description={error} onRetry={retryStorage} /> : <article className="flex flex-col gap-3 md:row-span-3 rounded-2xl border border-neutral-300 bg-white p-4">
        <ListChecks className="h-6 w-6 text-primary-700" strokeWidth={2} aria-hidden="true" />
        <p className="text-body-sm text-neutral-600">{t(recentSet ? "Your saved set" : "Start with your sets")}</p>
        <h2 className="break-words text-h4">{recentSet?.name ?? t("Start with your sets")}</h2>
        <p className="text-body text-neutral-600">
          {recentSet ? t(recentSet.items.length === 1 ? "{count} item · Estimated total" : "{count} items · Estimated total", { count: recentSet.items.length }) : t("Save the groceries and exact quantities you buy every week in one place.")}</p>
        {recentSet && <output aria-label={t("{name} estimated total", { name: recentSet.name })} className="text-h3">{money(setTotal(recentSet))}</output>}
        {recentSet && recentSet.items.length > 0 && <ButtonLink href={`/compare?set=${encodeURIComponent(recentSet.id)}`}>{t("Compare stores")}</ButtonLink>}
        <ButtonLink variant="secondary" href={recentSet ? `/sets/${encodeURIComponent(recentSet.id)}` : "/sets"}>
          {t(recentSet ? "Open set" : "Create First Set")}<ArrowRight className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
        </ButtonLink>
      </article>}
      {drafts.error && <ErrorState description={drafts.error} onRetry={retryDrafts} />}
      <Button variant="secondary" disabled={!loaded || !!error || !drafts.loaded || !!drafts.error} onClick={createSet}>{t(drafts.value.editors["/sets"] ? "Continue draft" : "New Set")}</Button>
      <ButtonLink href="/demo" variant="text">{t("Demo scenarios")}</ButtonLink>
    </section>
  );
}
