"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, Copy, Ellipsis, Pencil, Trash2 } from "lucide-react";
import { Button, ButtonLink } from "@/src/components/ui";
import { panelStyles } from "@/src/components/ui/styles";
import { useLocale } from "@/src/i18n/locale";
import type { MealSet } from "./model";

type Props = { set: MealSet; disabled?: boolean; onRename: () => void; onDuplicate: () => void; onDelete: () => void };
export function SetSummary({ set, disabled, onRename, onDuplicate, onDelete }: Props) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const triggerId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const initialFocus = useRef("first");
  const expanded = open && !disabled;
  useEffect(() => {
    if (!expanded) return;
    const items = menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]');
    const item = initialFocus.current === "last" ? items?.[items.length - 1] : items?.[0];
    item?.focus();
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [expanded]);
  function menuKeys(event: KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') ?? []);
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      const next = event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      items[next]?.focus();
    }
  }
  function act(action: () => void) {
    setOpen(false);
    triggerRef.current?.focus();
    action();
  }
  return (
    <article className={panelStyles} aria-label={t("Set: {name}", { name: set.name })}>
      <h2 className="break-words text-h4">{set.name}</h2>
      <div className="flex min-w-0 items-start gap-2">
        <ButtonLink href={`/sets/${encodeURIComponent(set.id)}`} className="min-w-0 flex-1">{t("Open set")}<ArrowRight className="h-6 w-6" strokeWidth={2} aria-hidden="true" /></ButtonLink>
        <div ref={rootRef} className="relative shrink-0" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
          <Button ref={triggerRef} id={triggerId} variant="text" className="w-12" disabled={disabled} aria-label={t("Actions for {name}", { name: set.name })} aria-haspopup="menu" aria-expanded={expanded} aria-controls={expanded ? menuId : undefined} onClick={() => { initialFocus.current = "first"; setOpen(!expanded); }} onKeyDown={event => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); initialFocus.current = event.key === "ArrowUp" ? "last" : "first"; setOpen(true); }
          }}><Ellipsis className="h-6 w-6" strokeWidth={2} aria-hidden="true" /></Button>
          {expanded && <div ref={menuRef} id={menuId} role="menu" aria-labelledby={triggerId} onKeyDown={menuKeys} className="absolute right-0 top-full z-20 mt-2 flex w-56 flex-col gap-1 rounded-2xl border border-neutral-300 bg-white p-2 shadow-lg">
            <Button role="menuitem" tabIndex={-1} variant="text" className="justify-start" onClick={() => act(onRename)}><Pencil className="h-6 w-6" aria-hidden="true" />{t("Edit")}</Button>
            <Button role="menuitem" tabIndex={-1} variant="text" className="justify-start" onClick={() => act(onDuplicate)}><Copy className="h-6 w-6" aria-hidden="true" />{t("Copy")}</Button>
            <Button role="menuitem" tabIndex={-1} variant="text" className="justify-start text-status-error" onClick={() => act(onDelete)}><Trash2 className="h-6 w-6" aria-hidden="true" />{t("Delete")}</Button>
          </div>}
        </div>
      </div>
    </article>
  );
}
