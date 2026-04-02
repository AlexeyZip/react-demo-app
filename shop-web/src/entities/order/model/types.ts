export type OrderStatus = "pending" | "paid" | "shipped";

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customer: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
  };
  items: Array<{
    productId: string;
    title: string;
    price: number;
    quantity: number;
  }>;
  totalPrice: number;
}
