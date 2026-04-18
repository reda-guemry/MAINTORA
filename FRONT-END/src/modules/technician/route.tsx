import RoleGuard from "@/app/router/guards/RoleGuard";
import DashboardPage from "./pages/Dashboard";


export const technicianRoutes = [
  {
    element: <RoleGuard allowedRoles={["technician"]} />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
];
