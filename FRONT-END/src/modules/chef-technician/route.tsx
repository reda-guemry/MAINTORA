import RoleGuard from "@/app/router/guards/RoleGuard";
import { Dashboard } from "./pages/Dashboard";


export const chefRoutes = [
  {
    element: <RoleGuard allowedRoles={["chef-technician"]} />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
];
