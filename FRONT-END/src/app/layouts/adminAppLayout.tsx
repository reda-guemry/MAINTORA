import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { useLogout } from "@/features/auth";
import { MaintoraLogo } from "@/shared/components/ui";
import { getAdminBreadcrumbLabel } from "../utils/layoutAdmin";

function AdminAppLayout() {
  const { user } = useAuth();
  const { logout } = useLogout();
  const { pathname } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const breadcrumbLabel = getAdminBreadcrumbLabel(pathname);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between bg-white shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between p-6">
            <MaintoraLogo
              to="/admin"
              size={28}
              showText
              title="MAINTORA"
              subtitle="Admin Control Panel"
              wrapperClassName="flex items-center gap-3"
              markClassName="w-9 h-9 bg-[#43968C] rounded-xl flex items-center justify-center text-white shadow-sm"
              textClassName="flex flex-col"
              titleClassName="text-[13px] font-extrabold text-[#43968C] uppercase tracking-wide"
              subtitleClassName="text-[10px] text-slate-400 font-medium"
              ariaLabel="Go to admin dashboard"
            />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500 lg:hidden"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <nav className="mt-2 space-y-1 px-4">
            {[
              { to: "/admin", label: "Dashboard", icon: "space_dashboard", end: true },
              { to: "/admin/users", label: "Users", icon: "group" },
              { to: "/admin/machines", label: "Machines", icon: "settings_suggest" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] transition-all ${
                    isActive
                      ? "bg-teal-50 font-bold text-[#43968C]"
                      : "font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <span className="material-symbols-outlined text-[20px]">
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <NavLink
              to="/admin/profile"
              className="flex min-w-0 flex-1 items-center gap-3 transition-colors hover:opacity-80"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#43968C] text-white">
                <span className="material-symbols-outlined text-[18px]">
                  admin_panel_settings
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-slate-900">
                  {user?.first_name}
                </p>
                <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-[#43968C]">
                  Administrator
                </p>
              </div>
            </NavLink>

            <button
              onClick={logout}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white hover:text-red-500 hover:shadow-sm"
              title="Logout"
            >
              <span className="material-symbols-outlined text-[18px]">
                logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <header className="z-10 flex h-20 shrink-0 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 shadow-sm transition-all hover:bg-slate-50 lg:hidden"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <span className="material-symbols-outlined text-[16px] hidden sm:block">
                shield_person
              </span>
              <span className="hidden sm:block">/</span>
              <span className="text-[#43968C] truncate max-w-37.5 sm:max-w-none">
                {breadcrumbLabel}
              </span>
            </div>
          </div>

        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-8">
          <div className="mx-auto w-full max-w-300">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminAppLayout;