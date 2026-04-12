import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

export function ProtectedRoute() {
  const { isAuthenticated , authStatus } = useAuth();

  if (authStatus === "idle" || authStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}