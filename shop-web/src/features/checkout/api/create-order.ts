import { apiRequest } from "@/shared/api/http";
import type {
  CreateOrderRequest,
  CreateOrderResponse,
} from "@/features/checkout/model/types";

export function createOrder(payload: CreateOrderRequest) {
  return apiRequest<CreateOrderResponse>("/orders", {
    method: "POST",
    body: payload,
  });
}
