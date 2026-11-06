export const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2";
export const fieldStyles = `h-[52px] w-full min-w-0 rounded-[10px] border border-neutral-500 bg-white px-3 text-body text-neutral-900 placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-300 ${focusRing}`;
export const panelStyles = "flex min-w-0 flex-col gap-4 rounded-2xl border border-neutral-300 bg-white p-4";
export type UIState = "Default" | "Loading" | "Error" | "Disabled" | "Empty";
