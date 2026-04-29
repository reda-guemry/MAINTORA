import RoleGuard from "@/app/router/guards/RoleGuard";
import DashboardPage from "./pages/Dashboard";
import MapPage from "./pages/Map";
import SubmitMaintenancePage from "./pages/SubmitMaintenance";
import MaintenanceAnomalyPage from "./pages/MaintenanceAnomaly";
import CalendarPage from "./pages/Calendar";


export const technicianRoutes = [
  {
    element: <RoleGuard allowedRoles={["technician"]} />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "map",
        element: <MapPage />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "maintenance/:taskId",
        element: <SubmitMaintenancePage />,
      },
      {
        path: "maintenance/:taskId/anomaly/:checklistItemId",
        element: <MaintenanceAnomalyPage />,
      },
    ],
  },
];
