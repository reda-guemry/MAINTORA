import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { MaintoraLogo } from "@/shared";

export function ProtectedRoute() {
  const { authStatus } = useAuth();

  if (authStatus === "idle" || authStatus === "loading") {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 selection:bg-transparent">
        <div className="flex flex-col items-center gap-8">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-4xl bg-white shadow-2xl shadow-teal-900/10">
            <div className="absolute inset-0 rounded-4xl border-[3px] border-slate-100"></div>
            
            <div className="absolute inset-0 rounded-4xl border-[3px] border-[#43968C] border-t-transparent border-r-transparent animate-spin duration-1000"></div>
            
            <div className="flex items-center justify-center animate-pulse scale-90">
              <MaintoraLogo />
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2.5 text-center">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-slate-900 animate-pulse">
              System Initializing
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Verifying Secure Session...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (authStatus === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}