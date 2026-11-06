"use client";

import { Error as ErrorState } from "@/components/layout/screen-states";

export default function ErrorPage({ retry }: { error: unknown; retry: () => void }) {
  return <ErrorState onRetry={retry} />;
}
