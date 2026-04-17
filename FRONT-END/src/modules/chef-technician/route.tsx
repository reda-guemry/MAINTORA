import RoleGuard from "@/app/router/guards/RoleGuard";
import { Dashboard } from "./pages/Dashboard";
import { ChecklistTemplatesPage } from "./pages/ChecklistTemplates";
import { ChecklistItemsPage } from "./pages/ChecklistItems";


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
    ],
  },
];
