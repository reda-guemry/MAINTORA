import RoleGuard from "@/app/router/guards/RoleGuard";
import Dashboard from "../client/pages/Dashboard";
import MachinesManagement from "./pages/MachinesManagment";
import ClientMapPage from "./pages/Map";
import RepairRequestsPage from "./pages/RepairRequests";
import MachineHistoryPage from "./pages/MachineHistory";

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
        path: "machines/:machineId/history",
        element: <MachineHistoryPage />,
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
