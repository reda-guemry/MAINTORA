import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

type RoleGuardProps = {
  allowedRoles: string[];
};

function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = user.roles.some((role) => allowedRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}


export default RoleGuard ;

