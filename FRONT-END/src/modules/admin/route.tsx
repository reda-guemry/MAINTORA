import RoleGuard from "@/app/router/guards/RoleGuard";
import DashboardPage from "./pages/DashboardPage";

export const adminRoutes = [
  {
    element: <RoleGuard allowedRoles={["admin"]} />,
    Children: [
      {
        index: true,
        // path : "dashboard",
        element: <DashboardPage />,
      },
    ],
  },
];
