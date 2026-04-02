import { apiRequest } from "@/shared/api/http";
import type { Product } from "@/entities/product";

export type UpsertProductPayload = Omit<Product, "id">;

export function createProduct(payload: UpsertProductPayload) {
  return apiRequest<Product>("/admin/products", {
    method: "POST",
    body: payload,
  });
}

export function updateProduct(id: string, payload: UpsertProductPayload) {
  return apiRequest<Product>(`/admin/products/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

export function deleteProduct(id: string) {
  return apiRequest<Product>(`/admin/products/${id}`, {
    method: "DELETE",
  });
}
