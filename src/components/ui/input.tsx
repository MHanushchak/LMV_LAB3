"use client";

import { useLocale } from "@/src/i18n/locale";

import { useId, type InputHTMLAttributes } from "react";
import { CircleAlert } from "lucide-react";
import { fieldStyles } from "./styles";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string; helperText?: string; error?: string };
export function Input({ label, helperText, error, id, className = "", ...props }: InputProps) {
  const { t } = useLocale();
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionIds = [helperText && `${inputId}-helper`, error && `${inputId}-error`, props["aria-describedby"]].filter(Boolean).join(" ");
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={inputId} className="text-h6">{t(label)}</label>
      <input {...props} placeholder={props.placeholder ? t(props.placeholder) : undefined} id={inputId} aria-invalid={error ? true : undefined} aria-describedby={descriptionIds || undefined} className={`${fieldStyles} ${error ? "border-status-error" : ""} ${className}`} />
      {helperText && <p id={`${inputId}-helper`} className="text-body-sm text-neutral-600">{t(helperText)}</p>}
      {error && <p id={`${inputId}-error`} className="flex items-start gap-2 text-body-sm text-status-error" aria-live="polite"><CircleAlert aria-hidden="true" className="h-6 w-6 shrink-0" strokeWidth={2} />{t(error)}</p>}
    </div>
  );
}
export const InputStates = {
  Default: Input,
  Loading: (props: InputProps) => <Input {...props} readOnly aria-busy="true" helperText="Loading…" />,
  Error: (props: InputProps) => <Input {...props} error={props.error ?? "Check this value."} />,
  Disabled: (props: InputProps) => <Input {...props} disabled />,
  Empty: (props: InputProps) => <Input {...props} defaultValue={undefined} value="" readOnly />,
};
