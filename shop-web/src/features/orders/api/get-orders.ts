import { apiRequest } from "@/shared/api/http";
import type { Order } from "@/entities/order";

export function getOrders() {
  return apiRequest<Order[]>("/orders");
}
