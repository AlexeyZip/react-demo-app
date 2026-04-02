import type { CartItem } from "@/entities/cart/model/types";

export interface CheckoutFormValues {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface CreateOrderRequest {
  customer: CheckoutFormValues;
  items: CartItem[];
  totalPrice: number;
}

export interface CreateOrderResponse extends CreateOrderRequest {
  id: string;
  createdAt: string;
}
