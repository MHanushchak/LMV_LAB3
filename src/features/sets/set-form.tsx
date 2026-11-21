"use client";

import { useLocale } from "@/src/i18n/locale";

import { useRef, useState, type FormEvent } from "react";
import { Button, Input } from "@/src/components/ui";
import { toast } from "../notifications/store";
import { panelStyles } from "@/src/components/ui/styles";
import { validateSetName, type MealSet } from "./model";
import { updateSets, useSets } from "./store";
import type { SetDraft } from "../drafts/model";

type Props = { draft: SetDraft; onChange: (draft: SetDraft) => void; set?: MealSet; onClose: () => void; onSaved: (message: string) => void };
export function SetForm({ draft, onChange, set, onClose, onSaved }: Props) {
  const { t } = useLocale();
  const { data, error: storageError } = useSets();
  const name = draft.name;
  const setName = (name: string) => onChange({ ...draft, name });
  const [touched, setTouched] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const error = touched ? validateSetName(name, data.sets, set?.id) : undefined;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    const problem = validateSetName(name, data.sets, set?.id);
    if (problem) {
      toast.error(problem, { id: "set-validation" });
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>("[aria-invalid=true]")?.focus());
      return;
    }
    toast.dismiss("set-validation");
    const saved = updateSets(current => {
      if (validateSetName(name, current.sets, set?.id)) throw new Error("Duplicate set name.");
      if (set) return { ...current, sets: current.sets.map(existing => existing.id === set.id ? { ...existing, name: name.trim() } : existing) };
      return { ...current, sets: [...current.sets, { id: crypto.randomUUID(), name: name.trim(), items: [] }] };
    });
    if (saved) {
      onSaved(set ? "Set name updated." : "Set created.");
      onClose();
    }
  }
  return (
    <form ref={formRef} onSubmit={submit} noValidate className={panelStyles} aria-label={set ? t("Rename set") : t("Create set")}>
      <h1 className="text-h4">{set ? t("Rename set") : t("New set")}</h1>
      <Input label={t("Set name")} name="setName" value={name} onChange={event => { toast.dismiss("set-validation"); setName(event.target.value); setTouched(true); }} error={error} helperText={t("Enter 2–40 characters. Each set needs a unique name.")} required autoFocus />
      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={!!storageError}>{set ? t("Save name") : t("Create set")}</Button>
        <Button variant="text" onClick={onClose}>{t("Cancel")}</Button>
      </div>
    </form>
  );
}
