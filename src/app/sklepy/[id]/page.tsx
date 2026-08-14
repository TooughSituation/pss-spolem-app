import { notFound } from "next/navigation";
import { getStore, stores } from "@/lib/data/stores";
import { StoreDetailView } from "@/components/stores/store-detail-view";

export function generateStaticParams() {
  return stores.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return { title: getStore(id)?.name ?? "Sklep" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const store = getStore(id);
  if (!store) notFound();
  return <StoreDetailView store={store} />;
}