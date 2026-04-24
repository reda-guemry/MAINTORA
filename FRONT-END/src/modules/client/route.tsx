import RoleGuard from "@/app/router/guards/RoleGuard";
import Dashboard from "../client/pages/Dashboard";
import MachinesManagement from "./pages/MachinesManagment";
import ClientMapPage from "./pages/Map";
import RepairRequestsPage from "./pages/RepairRequests";

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
      },
      {
        path: "map",
        element: <ClientMapPage />,
      },
      {
        path: "repair-requests",
        element: <RepairRequestsPage />,
      }
    ],
  },
];
