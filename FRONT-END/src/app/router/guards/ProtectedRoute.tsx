import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

export function ProtectedRoute() {
  const { authStatus } = useAuth();

  if (authStatus === "idle" || authStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (authStatus === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}