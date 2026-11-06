import type { Metadata } from "next";
import { SetsPage } from "@/src/features/sets/sets-page";

export const metadata: Metadata = { title: "My Sets" };
export default function Page() { return <SetsPage />; }
