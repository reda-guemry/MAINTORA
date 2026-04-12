import RoleGuard from "@/app/router/guards/RoleGuard";
import DashboardPage from "./pages/DashboardPage";

export const adminRoutes = [
  {
    element: <RoleGuard allowedRoles={["admin"]} />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
];
