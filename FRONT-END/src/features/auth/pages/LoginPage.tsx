import { MaintoraLogo } from "@/shared/components/ui";
import { LoginForm } from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { getDefaultRouteByRole } from "../utils/getDefaultRouteByRole";
import type { User } from "../types/auth.type";
// import { useAuth } from "@/context/useAuth";

export function LoginPage() {
  const navigate = useNavigate();

  function handleLoginSuccess(roles: NonNullable<User["roles"]>) {
    const defaultRoute = getDefaultRouteByRole(roles.map(role => role.name));
    navigate(defaultRoute);
    
  }


  return (
    <main className="min-h-screen bg-background-light font-display">
      <div className="grid-bg flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-110">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
              <MaintoraLogo
                to="/"
                size={46}
                wrapperClassName="inline-flex items-center justify-center"
                ariaLabel="Go to home page"
              />
            </div>

            <p className="text-sm text-text-muted">
              Preventive Maintenance Management
            </p>
          </div>

          <LoginForm onSuccess={handleLoginSuccess} />

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                System Operational
              </span>
            </div>

            <div className="h-1 w-1 rounded-full bg-neutral-gray" />

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                v2.4.0-stable
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
