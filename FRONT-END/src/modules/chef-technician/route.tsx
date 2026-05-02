import RoleGuard from "@/app/router/guards/RoleGuard";
import { Dashboard } from "./pages/Dashboard";
import { ChecklistTemplatesPage } from "./pages/ChecklistTemplates";
import { ChecklistItemsPage } from "./pages/ChecklistItems";
import { Rounde } from "./pages/Rounde";
import { AnomaliesPage } from "./pages/Anomalies";
import { MachineHistoryPage } from "./pages/MachineHistory";
import { MaintenanceCyclesPage } from "./pages/MaintenanceCycles";
import { ProfilePage } from "@/features/profile";


export const chefRoutes = [
  {
    element: <RoleGuard allowedRoles={["chef technician"]} />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "checklist/templates",
        element: <ChecklistTemplatesPage />,
      },
      {
        path: "checklist/items",
        element: <ChecklistItemsPage />,
      },
      {
        path: "maintenance-cycles",
        element: <MaintenanceCyclesPage />,
      },
      {
        path: "mape",
        element: <Rounde />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "machines/:machineId/history",
        element: <MachineHistoryPage />,
      },
      {
        path: "anomalies",
        element: <AnomaliesPage />,
      }
    ],
  },
];
