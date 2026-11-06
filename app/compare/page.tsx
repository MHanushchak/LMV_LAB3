import { Suspense } from "react";
import { Loading } from "@/components/layout/screen-states";
import type { Metadata } from "next";
import { ComparePage } from "@/src/features/compare/compare-page";

export const metadata: Metadata = { title: "Where Cheaper" };
export default function Page() { return <Suspense fallback={<Loading />}><ComparePage /></Suspense>; }
