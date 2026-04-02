export type UserRole = "user" | "admin";

export interface ApiUser {
  id: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
}
