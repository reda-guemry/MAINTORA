import RoleGuard from "@/app/router/guards/RoleGuard";
import DashboardPage from "./pages/Dashboard";
import MapPage from "./pages/Map";
import SubmitMaintenancePage from "./pages/SubmitMaintenance";


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
        path: "maintenance/:taskId",
        element: <SubmitMaintenancePage />,
      },
    ],
  },
];
