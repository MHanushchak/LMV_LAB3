"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

const subscribe = () => () => {};
const getTarget = () => document.getElementById("screen-actions");
const getServerTarget = () => null;

/** Render screen actions outside the scrolling content, above navigation. */
export function ActionBar({ children }: { children: ReactNode }) {
  const target = useSyncExternalStore(subscribe, getTarget, getServerTarget);
  return target ? createPortal(<div className="action-bar">{children}</div>, target) : null;
}
