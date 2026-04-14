import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { getDefaultRouteByRole } from "@/features/auth";

type RoleGuardProps = {
  allowedRoles: string[];
};

function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = user.roles.some((role) => allowedRoles.includes(role.name));

  if (!hasAccess) {
    return <Navigate to={getDefaultRouteByRole(user.roles.map((role) => role.name))} replace />;
  }

  return <Outlet />;
}

export default RoleGuard;