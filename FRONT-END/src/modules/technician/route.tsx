import RoleGuard from "@/app/router/guards/RoleGuard";
import DashboardPage from "./pages/Dashboard";
import MapPage from "./pages/Map";


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
    ],
  },
];
