import { Suspense } from "react";
import { Loading } from "@/components/layout/screen-states";
import { SetsPage } from "@/src/features/sets/sets-page";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <Suspense fallback={<Loading />}><SetRoute params={params} /></Suspense>;
}
async function SetRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SetsPage setId={id} />;
}
