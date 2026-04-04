import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./app-layout";
import { HomePage } from "@/pages/home-page";
import { LoginPage } from "@/pages/login-page";
import { AdminPage } from "@/pages/admin-page";
import { ProtectedRoute } from "./protected-route";
import { CartPage } from "@/pages/cart-page";
import { CheckoutPage } from "@/pages/checkout-page";
import { OrderSuccessPage } from "@/pages/order-success-page";
import { OrdersPage } from "@/pages/orders-page";
import { AdminOrdersPage } from "@/pages/admin-orders-page";
import { ErrorPage } from "@/pages/error-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "order-success", element: <OrderSuccessPage /> },
      { path: "orders", element: <OrdersPage /> },
      {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          { path: "admin", element: <AdminPage /> },
          { path: "admin/orders", element: <AdminOrdersPage /> },
        ],
      },
    ],
  },
]);
