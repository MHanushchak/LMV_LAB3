"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { useLocale } from "@/src/i18n/locale";
import { productPhoto } from "@/src/features/catalog/product-images";

export function ProductImage({ name, productId }: { name: string; productId?: string }) {
  const { t } = useLocale();
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const photo = productPhoto(productId);
  if (photo && photo.src !== failedSource) return <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-300 bg-white">
    <Image src={photo.src} alt={name} width={64} height={64} sizes="64px" className="h-full w-full object-contain" onError={() => setFailedSource(photo.src)} />
  </span>;
  return <span role="img" aria-label={t("{name}: image placeholder", { name })} className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-neutral-300 bg-neutral-50 text-neutral-500"><ImageOff className="h-6 w-6" strokeWidth={2} aria-hidden="true" /></span>;
}
