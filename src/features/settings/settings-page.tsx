"use client";

import { useId } from "react";
import { Languages, MapPin } from "lucide-react";
import { useLocale } from "@/src/i18n/locale";
import { Button, ButtonLink, ErrorState } from "@/src/components/ui";
import { fieldStyles, panelStyles } from "@/src/components/ui/styles";
import { stores } from "../catalog/catalog";
import { cities } from "./model";
import { retryPreferences, updatePreferences, usePreferences } from "./store";

export function SettingsPage() {
  const { t, locale, error, setLocale } = useLocale();
  const preferences = usePreferences();
  const cityId = useId();
  const city = cities.find(city => city.id === preferences.value.city)!;
  return (
    <section className="flex min-w-0 flex-col gap-6" aria-labelledby="settings-title">
      <h1 id="settings-title" className="text-h1">{t("Settings")}</h1>
      <fieldset className={panelStyles}>
        <legend className="px-2 text-h4">{t("Interface language")}</legend>
        <Languages aria-hidden="true" className="h-6 w-6 text-primary-700" strokeWidth={2} />
        <div className="flex flex-col gap-3">
          <Button lang="uk" variant={locale === "uk" ? "primary" : "secondary"} aria-pressed={locale === "uk"} onClick={() => setLocale("uk")}>Українська</Button>
          <Button lang="en" variant={locale === "en" ? "primary" : "secondary"} aria-pressed={locale === "en"} onClick={() => setLocale("en")}>English</Button>
        </div>
        <p role="status" className="text-body-sm text-neutral-600">{t(error ? "Language changed for this session. Browser storage is unavailable." : "Language saved on this device.")}</p>
      </fieldset>
      {preferences.error && <ErrorState description={preferences.error} onRetry={retryPreferences} />}
      <section className={panelStyles} aria-labelledby="location-title">
        <MapPin className="h-6 w-6 text-primary-700" aria-hidden="true" />
        <h2 id="location-title" className="text-h4">{t("City and stores")}</h2>
        <label htmlFor={cityId} className="text-h6">{t("City")}</label>
        <select id={cityId} value={preferences.value.city} disabled={!preferences.loaded || !!preferences.error} className={fieldStyles} onChange={event => {
          const next = cities.find(city => city.id === event.target.value)!;
          updatePreferences(current => ({ ...current, city: next.id, storeIds: [...next.storeIds] }));
        }}>{cities.map(city => <option key={city.id} value={city.id}>{t(city.name)}</option>)}</select>
        <p className="text-body-sm text-neutral-600">{t("Demo city coverage only. This does not represent real retailer coverage.")}</p>
        <fieldset className="flex min-w-0 flex-col gap-2" disabled={!preferences.loaded || !!preferences.error}>
          <legend className="mb-2 text-h6">{t("Preferred stores")}</legend>
          {stores.map(store => {
            const available = (city.storeIds as readonly string[]).includes(store.id);
            return <label key={store.id} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-[10px] border border-neutral-500 p-3">
              <input type="checkbox" className="h-6 w-6 shrink-0 accent-primary-700" disabled={!available} checked={available && preferences.value.storeIds.includes(store.id)} onChange={event => updatePreferences(current => ({ ...current, storeIds: event.target.checked ? [...current.storeIds.filter(id => id !== store.id), store.id] : current.storeIds.filter(id => id !== store.id) }))} />
              <span className="flex min-w-0 flex-col text-body">{store.name}{!available && <span className="text-caption text-neutral-600">{t("Unavailable for this demo city")}</span>}</span>
            </label>;
          })}
        </fieldset>
        <p className="text-caption text-neutral-600">{t("Preferences save automatically and filter store comparison.")}</p>
        <ButtonLink href="/compare" variant="secondary">{t("Compare stores")}</ButtonLink>
      </section>
    </section>
  );
}
