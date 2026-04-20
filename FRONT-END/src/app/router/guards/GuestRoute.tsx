import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { getDefaultRouteByRole } from "@/features/auth";

export function GuestRoute() {
  const { user , authStatus } = useAuth();

   if (authStatus === "idle" || authStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (authStatus === "authenticated" && user) {
    const roleNames = user.roles?.map((role) => role.name) ?? [];

    return <Navigate to={getDefaultRouteByRole(roleNames)} replace />;
  }

  console.log("GuestRoute authStatus:", authStatus);
  return <Outlet />;
}
