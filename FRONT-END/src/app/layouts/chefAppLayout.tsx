import { useAuth } from "@/context/useAuth";
import { useLogout } from "@/features/auth";
import { MaintoraLogo } from "@/shared/components/ui";
import { NavLink, Outlet } from "react-router-dom";

export function ChefAppLayout() {
    const { user } = useAuth();
    const { logout } = useLogout();
    // console.log(user) ;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dff7f1_0%,#eef7f7_38%,#f8fafc_100%)] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-white/60 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                <MaintoraLogo />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary/70">
                  Chef Technician
                </p>
                <h2 className="text-lg font-black tracking-tight text-slate-900">
                    MAINTORA  
                </h2>
              </div>
            </div>
            <nav className="hidden items-center gap-2 md:flex">
              <NavLink
                    to="/chef-technician"
                    end
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    }`
                  }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/chef-technician/checklist/templates"
                    end
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    }`
                  }
                >
                    Checklist Templates
                </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 sm:block">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                Signed In
              </p>
              <p className="mt-1 text-sm font-bold text-slate-900">
                {user?.first_name} {user?.last_name}
              </p>
            </div>

            <button
              type="button"
              onClick={logout}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white transition-colors hover:bg-primary"
            >
              <span className="material-symbols-outlined text-[20px]">
                logout
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-6 flex gap-2 overflow-x-auto md:hidden">
          {/* {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-white text-slate-500 shadow-sm"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))} */}
        </div>

        <Outlet />
      </main>
    </div>
  );
}
