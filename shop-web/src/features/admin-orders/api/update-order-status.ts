import { apiRequest } from "@/shared/api/http";
import type { Order, OrderStatus } from "@/entities/order";

export function updateOrderStatus(orderId: string, status: OrderStatus) {
  return apiRequest<Order>(`/admin/orders/${orderId}/status`, {
    method: "PATCH",
    body: { status },
  });
}
