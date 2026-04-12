import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { getDefaultRouteByRole } from "@/features/auth";

export function GuestRoute() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    return <Navigate to={getDefaultRouteByRole(user.roles)} replace />;
  }

  return <Outlet />;
}