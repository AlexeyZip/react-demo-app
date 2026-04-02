import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./app-layout";
import { HomePage } from "@/pages/home-page";
import { LoginPage } from "@/pages/login-page";
import { AdminPage } from "@/pages/admin-page";
import { NotFoundPage } from "@/pages/not-found-page";
import { ProtectedRoute } from "./protected-route";
import { CartPage } from "@/pages/cart-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "cart", element: <CartPage /> },
      {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [{ path: "admin", element: <AdminPage /> }],
      },
    ],
  },
]);
