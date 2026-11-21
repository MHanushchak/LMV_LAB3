"use client";

import { useLocale } from "@/src/i18n/locale";
import { Children } from "react";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { LoaderCircle } from "lucide-react";
import { focusRing } from "./styles";

const variants = {
  primary: "bg-primary-700 bg-linear-to-r from-neutral-900/0 to-neutral-900/0 text-white hover:from-neutral-900/10 hover:to-neutral-900/10 active:from-neutral-900/20 active:to-neutral-900/20",
  secondary: "border border-primary-700 bg-white text-primary-700 hover:bg-primary-100 active:bg-primary-100/70",
  text: "text-primary-700 hover:bg-primary-100 active:bg-primary-100/70",
};
export type ButtonVariant = keyof typeof variants;
export function buttonStyles(variant: ButtonVariant = "primary", className = "") {
  return `inline-flex h-12 min-w-11 shrink-0 select-none items-center justify-center gap-2 rounded-[10px] px-3 text-button transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-neutral-300 disabled:bg-neutral-300 disabled:text-neutral-600 ${focusRing} ${variants[variant]} ${className}`;
}
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; loading?: boolean; ref?: Ref<HTMLButtonElement> };
export function Button({ children, variant = "primary", loading = false, disabled, className, type = "button", ...props }: ButtonProps) {
  const { t } = useLocale();
  const label = Children.map(children, child => typeof child === "string" && child.trim() ? child.replace(child.trim(), t(child.trim())) : child);
  return (
    <button {...props} type={type} disabled={disabled || loading} aria-busy={loading || undefined} className={buttonStyles(variant, className)}>
      {/* Keep the label in normal flow to preserve width during loading. */}
      <span className="grid min-w-0 items-center justify-items-center">
        <span className={`col-start-1 row-start-1 flex min-w-0 items-center justify-center gap-2 ${loading ? "opacity-0" : ""}`}>{label}</span>
        {loading && <LoaderCircle aria-hidden="true" strokeWidth={2} className="col-start-1 row-start-1 h-6 w-6 motion-safe:animate-spin" />}
      </span>
    </button>
  );
}
export function ButtonLink({ href, children, variant, className }: { href: string; children: ReactNode; variant?: ButtonVariant; className?: string }) {
  const { t } = useLocale();
  const label = Children.map(children, child => typeof child === "string" && child.trim() ? child.replace(child.trim(), t(child.trim())) : child);
  return <Link scroll={false} href={href} className={buttonStyles(variant, className)}>{label}</Link>;
}
export const ButtonStates = {
  Default: Button,
  Loading: (props: ButtonProps) => <Button {...props} loading />,
  Disabled: (props: ButtonProps) => <Button {...props} disabled />,
  Error: (props: ButtonProps) => <Button {...props} aria-invalid="true" />,
  Empty: (props: ButtonProps) => <Button {...props} disabled>No action available</Button>,
};
