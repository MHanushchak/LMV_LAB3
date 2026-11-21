"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { toast } from "../notifications/store";
import { Button, ErrorState } from "@/src/components/ui";
import { panelStyles } from "@/src/components/ui/styles";
import { useLocale } from "@/src/i18n/locale";
import { startScenario } from "./demo-controls";
import { scenarios } from "./scenarios";
import type { ScenarioId } from "./sandbox";

export function DemoPage() {
  const { t } = useLocale();
  const [starting, setStarting] = useState<ScenarioId | null>(null);
  const [error, setError] = useState(false);
  function start(id: ScenarioId) {
    setError(false); setStarting(id);
    toast.loading("Starting scenario…", { id: "scenario-loading" });
    try { startScenario(id); }
    catch { toast.dismiss("scenario-loading"); setStarting(null); setError(true); }
  }
  return <section className="flex min-w-0 flex-col gap-6" aria-labelledby="demo-title">
    <header className="flex flex-col gap-2">
      <h1 id="demo-title" className="text-h1">{t("Demo scenarios")}</h1>
      <p className="text-body text-neutral-600">{t("Try the main flows with prepared data. Your saved sets and basket stay unchanged.")}</p>
      <p className="text-body-sm text-neutral-600">{t("Scenario data stays in this tab after reload. Exit the scenario to return to your data.")}</p>
    </header>
    {error && <ErrorState description={t("Could not start the scenario. Allow browser session storage and try again.")} onRetry={() => setError(false)} />}
    {scenarios.map((scenario, index) => <article key={scenario.id} className={panelStyles}>
      <p className="text-caption text-neutral-600">{t("Scenario {number}", { number: index + 1 })}</p>
      <h2 className="text-h4">{t(scenario.title)}</h2>
      <p className="text-body-sm text-neutral-600">{t(scenario.description)}</p>
      <ol className="flex list-decimal flex-col gap-2 pl-6 text-body-sm">{scenario.steps.map(step => <li key={step}>{t(step)}</li>)}</ol>
      <p className="text-body-sm"><span className="font-semibold">{t("Expected result")}: </span>{t(scenario.expected)}</p>
      <Button disabled={starting !== null} loading={starting === scenario.id} onClick={() => start(scenario.id)} aria-label={t("Start: {name}", { name: t(scenario.title) })}><Play className="h-6 w-6" aria-hidden="true" />{t("Start scenario")}</Button>
    </article>)}
  </section>;
}
