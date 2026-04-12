import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { getDefaultRouteByRole } from "@/features/auth";

export function GuestRoute() {
  const { isAuthenticated, user , authStatus } = useAuth();

   if (authStatus === "idle" || authStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (isAuthenticated && user) {
    return <Navigate to={getDefaultRouteByRole(user.roles)} replace />;
  }

  return <Outlet />;
}