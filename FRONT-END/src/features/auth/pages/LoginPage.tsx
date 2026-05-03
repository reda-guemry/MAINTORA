import { MaintoraLogo } from "@/shared/components/ui";
import { LoginForm } from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { getDefaultRouteByRole } from "../utils/getDefaultRouteByRole";
import type { User } from "../types/auth.type";

export function LoginPage() {
  const navigate = useNavigate();

  function handleLoginSuccess(roles: NonNullable<User["roles"]>) {
    const defaultRoute = getDefaultRouteByRole(roles.map(role => role.name));
    navigate(defaultRoute);
  }

  return (
    <main className="min-h-screen bg-slate-50 font-display selection:bg-[#43968C]/20 selection:text-[#43968C]">
      <div className="grid-bg flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-105">
          
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[28px] bg-white shadow-2xl shadow-teal-900/10 ring-1 ring-slate-100 transition-transform duration-300 hover:scale-105">
              <MaintoraLogo
                to="/"
                size={52}
                wrapperClassName="inline-flex items-center justify-center"
                ariaLabel="Go to home page"
              />
            </div>

            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              System Access
            </h1>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Preventive Maintenance Management
            </p>
          </div>

          <LoginForm onSuccess={handleLoginSuccess} />

          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              {/* Pulsing Green Dot */}
              <div className="relative flex h-2 w-2 items-center justify-center">
                <div className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></div>
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                System Operational
              </span>
            </div>

            <div className="h-1 w-1 rounded-full bg-slate-300" />

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                v2.4.0-stable
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}