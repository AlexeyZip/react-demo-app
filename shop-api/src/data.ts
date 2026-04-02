import type { ApiUser, Product } from "./types.js";

export const users: ApiUser[] = [
  {
    id: "u1",
    email: "user@shop.com",
    password: "user123",
    role: "user",
  },
  {
    id: "u2",
    email: "admin@shop.com",
    password: "admin123",
    role: "admin",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    title: "Wireless Mouse",
    description: "Ergonomic mouse with silent clicks.",
    price: 29.99,
    imageUrl:
      "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Accessories",
    inStock: true,
  },
  {
    id: "p2",
    title: "Mechanical Keyboard",
    description: "Compact keyboard with tactile switches.",
    price: 89.99,
    imageUrl:
      "https://images.pexels.com/photos/841228/pexels-photo-841228.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Accessories",
    inStock: true,
  },
  {
    id: "p3",
    title: "27-inch Monitor",
    description: "2K IPS display suitable for coding.",
    price: 249.99,
    imageUrl:
      "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Displays",
    inStock: false,
  },
];
