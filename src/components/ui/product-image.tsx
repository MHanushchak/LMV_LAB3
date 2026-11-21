"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { useLocale } from "@/src/i18n/locale";
import { productPhoto } from "@/src/features/catalog/product-images";

const imageFrame = "flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border border-neutral-300 p-1";

export function ProductImage({ name, productId }: { name: string; productId?: string }) {
  const { t } = useLocale();
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const photo = productPhoto(productId);
  if (photo && photo.src !== failedSource) return <span className={`${imageFrame} bg-white`}>
    <Image src={photo.src} alt={name} width={96} height={96} sizes="96px" className="h-full w-full object-contain object-center" onError={() => setFailedSource(photo.src)} />
  </span>;
  return <span role="img" aria-label={t("{name}: image placeholder", { name })} className={`${imageFrame} bg-neutral-50 text-neutral-500`}><ImageOff className="h-8 w-8" strokeWidth={2} aria-hidden="true" /></span>;
}
