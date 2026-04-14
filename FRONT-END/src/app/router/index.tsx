import { LoginPage } from "@/features/auth/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "@/modules/admin/route";
import { ProtectedRoute } from "./guards/ProtectedRoute";
import { GuestRoute } from "./guards/GuestRoute";
import AdminAppLayout from "../layouts/adminAppLayout";
import ClientAppLayout from "../layouts/clientAppLayout";

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
        element: <AdminAppLayout />,
        children: [...adminRoutes],
      },
      {
        path: "/client" , 
        element: <ClientAppLayout /> ,
        children: [...adminRoutes] ,
      } , 
      
    ],
  },
]);
