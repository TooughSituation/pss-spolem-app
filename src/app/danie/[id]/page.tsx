import { notFound } from "next/navigation";
import { DishDetails } from "@/components/gastronomia/dish-details";
import { dishes, getDish } from "@/lib/data/dishes";

export function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return { title: getDish(id)?.name ?? "Danie" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dish = getDish(id);
  if (!dish) notFound();
  return <DishDetails dish={dish} />;
}
