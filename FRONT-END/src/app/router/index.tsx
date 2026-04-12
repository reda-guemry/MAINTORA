import { LoginPage } from "@/features/auth/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { adminRoutes } from "@/modules/admin/route";
import { ProtectedRoute } from "./guards/ProtectedRoute";
import { GuestRoute } from "./guards/GuestRoute";

export const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/",
        element: <h1>Home</h1>,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <AppLayout />,
        children: [...adminRoutes],
      },
    ],
  },
]);
