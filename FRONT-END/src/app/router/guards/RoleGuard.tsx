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

  const roleNames = user.roles?.map((role) => role.name) ?? [];
  const hasAccess = roleNames.some((role) => allowedRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to={getDefaultRouteByRole(roleNames)} replace />;
  }

  return <Outlet />;
}

export default RoleGuard;
