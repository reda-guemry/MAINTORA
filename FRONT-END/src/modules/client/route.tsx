import RoleGuard from "@/app/router/guards/RoleGuard";
import Dashboard from "../client/pages/Dashboard";

export const clientRoutes = [
  {
    element: <RoleGuard allowedRoles={["client"]} />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      
    ],
  },
];
