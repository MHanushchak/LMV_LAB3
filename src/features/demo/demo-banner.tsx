"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui";
import { focusRing } from "@/src/components/ui/styles";
import { useLocale } from "@/src/i18n/locale";
import { DEMO_SESSION_KEY } from "./sandbox";
import { scenarios } from "./scenarios";
import { exitScenario, startScenario } from "./demo-controls";

function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
}
function snapshot() { try { return sessionStorage.getItem(DEMO_SESSION_KEY); } catch { return null; } }
export function DemoBanner() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => null);
  const { t } = useLocale();
  const [error, setError] = useState(false);
  if (!raw) return null;
  let id: unknown;
  try { id = JSON.parse(raw).scenarioId; } catch { /* Exit remains available for a damaged session. */ }
  const scenario = scenarios.find(s => s.id === id);
  function exit() { try { exitScenario(); } catch { setError(true); } }
  return <aside aria-label={t("Active scenario")} className="shrink-0 border-b border-neutral-300 bg-primary-100 px-4">
    <details className="max-h-64 overflow-y-auto">
      <summary className={`min-h-11 cursor-pointer select-none py-3 text-body-sm font-semibold text-primary-700 ${focusRing}`}>{t("Scenario")}: {scenario ? t(scenario.title) : t("Session unavailable")}</summary>
      <div className="flex flex-col gap-3 pb-3">
        {scenario && <ol className="flex list-decimal flex-col gap-2 pl-6 text-body-sm">{scenario.steps.map(step => <li key={step}>{t(step)}</li>)}</ol>}
        {scenario && <p className="text-body-sm">{t(scenario.expected)}</p>}
        {error && <p role="alert" className="text-body-sm text-status-error">{t("Session storage is unavailable. Check browser access and try again.")}</p>}
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={exit}>{t("Exit scenario")}</Button>
          {scenario && <Button variant="text" onClick={() => { try { startScenario(scenario.id); } catch { setError(true); } }}>{t("Restart")}</Button>}
          <Link href="/demo" className={`inline-flex min-h-11 items-center rounded-[10px] px-3 text-button text-primary-700 ${focusRing}`}>{t("All scenarios")}</Link>
        </div>
      </div>
    </details>
  </aside>;
}
