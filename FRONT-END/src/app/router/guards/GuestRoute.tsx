import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { getDefaultRouteByRole } from "@/features/auth";

export function GuestRoute() {
  const { user , authStatus } = useAuth();

   if (authStatus === "idle" || authStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (authStatus === "authenticated" && user) {
    return <Navigate to={getDefaultRouteByRole(user.roles)} replace />;
  }

  console.log("GuestRoute authStatus:", authStatus);
  return <Outlet />;
}