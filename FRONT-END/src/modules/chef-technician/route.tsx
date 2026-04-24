import RoleGuard from "@/app/router/guards/RoleGuard";
import { Dashboard } from "./pages/Dashboard";
import { ChecklistTemplatesPage } from "./pages/ChecklistTemplates";
import { ChecklistItemsPage } from "./pages/ChecklistItems";
import { Rounde } from "./pages/Rounde";
import { AnomaliesPage } from "./pages/Anomalies";


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
        path: "mape",
        element: <Rounde />,
      },
      {
        path: "anomalies",
        element: <AnomaliesPage />,
      }
    ],
  },
];
