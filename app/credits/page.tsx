"use client";

import { catalog } from "@/src/features/catalog/catalog";
import { productPhotos } from "@/src/features/catalog/product-images";
import { ProductImage } from "@/src/components/ui/product-image";
import { focusRing, panelStyles } from "@/src/components/ui/styles";
import { useLocale } from "@/src/i18n/locale";

export default function ImageCredits() {
  const { t, productName } = useLocale();
  return <section className="flex min-w-0 flex-col gap-6" aria-labelledby="credits-title">
    <header className="flex flex-col gap-2">
      <h1 id="credits-title" className="text-h1">{t("Image credits")}</h1>
      <p className="text-body-sm text-neutral-600">{t("Photos from Wikimedia Commons. Authors and licenses are listed below.")}</p>
      <p className="text-body-sm text-neutral-600">{t("Images resized and converted to WebP. Each image retains its original license.")}</p>
    </header>
    {catalog.map(product => {
      const photo = productPhotos[product.id];
      return <article key={product.id} className={panelStyles}>
        <div className="flex min-w-0 items-center gap-3"><ProductImage name={productName(product)} productId={product.id} /><h2 className="min-w-0 break-words text-h6">{productName(product)}</h2></div>
        <p className="break-words text-body-sm">{photo.author}</p>
        <p className="break-words text-caption text-neutral-600">{photo.title.replace(/^File:/, "")}</p>
        <div className="flex flex-wrap gap-2">
          <a href={photo.source} target="_blank" rel="noreferrer" className={`inline-flex min-h-11 items-center rounded-[10px] px-2 text-body-sm text-primary-700 underline ${focusRing}`}>{t("Original photo")}</a>
          {photo.licenseUrl ? <a href={photo.licenseUrl} target="_blank" rel="noreferrer" className={`inline-flex min-h-11 items-center rounded-[10px] px-2 text-body-sm text-primary-700 underline ${focusRing}`}>{photo.license}</a> : <span className="inline-flex min-h-11 items-center text-body-sm text-neutral-600">{photo.license}</span>}
        </div>
      </article>;
    })}
  </section>;
}
