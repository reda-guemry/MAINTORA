import RoleGuard from "@/app/router/guards/RoleGuard";
import Dashboard from "../client/pages/Dashboard";
import MachinesManagement from "./pages/MachinesManagment";

export const clientRoutes = [
  {
    element: <RoleGuard allowedRoles={["client"]} />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "machines",
        element: <MachinesManagement />,
      }
    ],
  },
];
