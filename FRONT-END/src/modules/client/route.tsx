import RoleGuard from "@/app/router/guards/RoleGuard";
import Dashboard from "../admin/pages/Dashboard";

export const clientRoutes = [
  {
    element: <RoleGuard allowedRoles={["admin"]} />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      
    ],
  },
];
