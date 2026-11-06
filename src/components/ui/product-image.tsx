"use client";

import { ImageOff } from "lucide-react";
import { useLocale } from "@/src/i18n/locale";
export function ProductImage({ name }: { name: string }) {
  const { t } = useLocale();
  return <span role="img" aria-label={t("{name}: image placeholder", { name })} className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-neutral-300 bg-neutral-50 text-neutral-500"><ImageOff className="h-6 w-6" strokeWidth={2} aria-hidden="true" /></span>;
}
