import { OrderStatus } from "@/components/gastronomia/order-status";

export const metadata = { title: "Status zamówienia" };

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderStatus id={id} />;
}
