import RoleGuard from "@/app/router/guards/RoleGuard";
import Dashboard from "./pages/Dashboard";
import UsersManagement from "./pages/UsersManagement";

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
    ],
  },
];
