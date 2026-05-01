import { NavLink, Outlet } from "react-router-dom";
import { useLogout } from "@/features/auth/";
import { MaintoraLogo } from "@/shared/components/ui";
import { useAuth } from "@/context/useAuth";

function ClientAppLayout() {

  const { logout } = useLogout() ;

  const { user } = useAuth() ;


  return (
    <div className="flex h-screen bg-[#F7F6F2] font-sans text-slate-800 overflow-hidden">
      <aside className="w-65 bg-white flex flex-col justify-between shadow-[2px_0_15px_rgba(0,0,0,0.03)] z-20">
        <div>
          <div className="p-6 flex items-center gap-3">
            <MaintoraLogo
              to="/client"
              size={28}
              showText
              title="MAINTORA"
              subtitle="Client Workspace"
              wrapperClassName="flex items-center gap-3"
              markClassName="w-9 h-9 bg-primary/80 rounded-lg flex items-center justify-center text-white"
              textClassName="flex flex-col"
              titleClassName="text-[13px] font-extrabold text-primary uppercase tracking-wide"
              subtitleClassName="text-[10px] text-gray-400 font-medium"
              ariaLabel="Go to client dashboard"
            />
          </div>

          <nav className="px-4 mt-2 space-y-1">
            <NavLink
              to="/client"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-[#eaf3f3] text-primary" : "text-gray-500 hover:bg-gray-50"} font-semibold transition-colors`
              }
            >
              <span className="material-symbols-outlined text-[20px]">
                space_dashboard
              </span>
              <span className="text-[13px]">Dashboard</span>
            </NavLink>

            <NavLink
              to="/client/machines"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-[#eaf3f3] text-primary" : "text-gray-500 hover:bg-gray-50"} font-medium transition-colors`
              }
            >
              <span className="material-symbols-outlined text-[20px]">
                settings_suggest
              </span>
              <span className="text-[13px]">Machines</span>
            </NavLink>
            <NavLink
              to="/client/map"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-[#eaf3f3] text-primary" : "text-gray-500 hover:bg-gray-50"} font-medium transition-colors`
              }
            >
              <span className="material-symbols-outlined text-[20px]">
                map
              </span>
              <span className="text-[13px]">Map</span>
            </NavLink>
            <NavLink
              to="/client/repair-requests"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-[#eaf3f3] text-primary" : "text-gray-500 hover:bg-gray-50"} font-medium transition-colors`
              }
            >
              <span className="material-symbols-outlined text-[20px]">
                build
              </span>
              <span className="text-[13px]">Repair Requests</span>
            </NavLink>
          </nav>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3">
            <NavLink
              to="/client/profile"
              className="flex min-w-0 flex-1 items-center gap-3 rounded-lg transition-colors hover:text-primary"
            >
              <div className="w-9 h-9 rounded-full bg-[#eaf3f3] flex items-center justify-center text-primary ">
                <span className="material-symbols-outlined text-[18px]">
                  person
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-bold text-gray-800">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="truncate text-[11px] text-gray-400 font-medium">
                  {user?.roles?.[0]?.name ?? "No role"}
                </p>
              </div>
            </NavLink>

            <div className="flex justify-end">
              <button
                onClick={logout}
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-19 px-8 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-[13px] font-medium text-gray-400">
            <span className="material-symbols-outlined text-[18px]">home</span>
            <span>/</span>
            <span className="text-gray-700">dashboard</span>
          </div>

          <div className="flex items-center gap-5">
            <button className="text-gray-400 hover:text-primary transition-colors relative">
              <span className="material-symbols-outlined text-[22px]">
                notifications
              </span>
              <span className="absolute top-0 right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F7F6F2]"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="mx-auto w-full max-w-375">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ClientAppLayout;
