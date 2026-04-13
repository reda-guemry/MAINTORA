import RoleGuard from "@/app/router/guards/RoleGuard";
import Dashboard from "./pages/Dashboard";
import UsersManagement from "./pages/UsersManagment";

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
      }
    ],
  },
];
