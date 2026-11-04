
import type { Product } from "@/types/product";

const API_BASE_URL =
  "https://openapi.programming-hero.com/api/bazardor";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await response.json();

  return products;
}
