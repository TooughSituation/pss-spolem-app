import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/data/products";
import { ProductDetailView } from "@/components/catalog/product-detail-view";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  return { title: product?.name ?? "Produkt" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();
  return <ProductDetailView product={product} />;
}