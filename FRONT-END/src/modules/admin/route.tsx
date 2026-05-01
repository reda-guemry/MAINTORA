import RoleGuard from "@/app/router/guards/RoleGuard";
import Dashboard from "./pages/Dashboard";
import UsersManagement from "./pages/UsersManagement";
import MachineHistoryPage from "./pages/MachineHistory";
import MachinesMapPage from "./pages/MachinesMap";
import { ProfilePage } from "@/features/profile";

export const adminRoutes = [
  {
    element: <RoleGuard allowedRoles={["admin"]} />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <UsersManagement />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "machines",
        element: <MachinesMapPage />,
      },
      {
        path: "machines/:machineId/history",
        element: <MachineHistoryPage />,
      },
    ],
  },
];
