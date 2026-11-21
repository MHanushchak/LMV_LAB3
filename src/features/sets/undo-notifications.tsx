"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "@/src/i18n/locale";
import { toast } from "../notifications/store";
import { undoDeletion } from "./model";
import { updateSets, useSets } from "./store";

/** Deletions share the floating toast region; persisted Undo data stays recoverable. */
export function UndoNotifications() {
  const { itemName } = useLocale();
  const { data } = useSets();
  const announced = useRef(new Set<string>());
  useEffect(() => {
    const active = new Set(data.pending.map(entry => entry.id));
    for (const id of announced.current) if (!active.has(id)) { toast.dismiss(`deletion:${id}`); announced.current.delete(id); }
    for (const entry of data.pending) {
      if (announced.current.has(entry.id)) continue;
      announced.current.add(entry.id);
      toast.info("Removed “{name}”", {
        id: `deletion:${entry.id}`,
        values: { name: entry.kind === "item" ? itemName(entry.item) : entry.label },
        action: { label: "Undo", onClick: () => {
          const saved = updateSets(data => undoDeletion(data, entry.id));
          if (saved) toast.success("Deletion undone.");
          return saved;
        } },
      });
    }
  }, [data.pending, itemName]);
  return null;
}
