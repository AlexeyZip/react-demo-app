import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./app-layout";
import { HomePage } from "@/pages/home-page";
import { LoginPage } from "@/pages/login-page";
import { AdminPage } from "@/pages/admin-page";
import { NotFoundPage } from "@/pages/not-found-page";
import { ProtectedRoute } from "./protected-route";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [{ path: "admin", element: <AdminPage /> }],
      },
    ],
  },
]);
