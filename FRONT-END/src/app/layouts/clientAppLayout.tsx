import { NavLink, Outlet } from "react-router-dom";
import { useLogout } from "@/features/auth/";
import { MaintoraLogo } from "@/shared/components/ui";
import { useAuth } from "@/context/useAuth";

function ClientAppLayout() {

  const { logout } = useLogout() ;

  const { user } = useAuth() ;


  return (
    <div className="flex h-screen bg-[#F7F6F2] font-sans text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white flex flex-col justify-between shadow-[2px_0_15px_rgba(0,0,0,0.03)] z-20">
        <div>
          <div className="p-6 flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/80  rounded-lg flex items-center justify-center text-white">
              <MaintoraLogo size={150} />
            </div>
            <div>
              <h1 className="text-[13px] font-extrabold text-primary uppercase tracking-wide">
                MAINTORA
              </h1>
              <p className="text-[10px] text-gray-400 font-medium">
                Admin Control Panel
              </p>
            </div>
          </div>

          {/* Nav Menu */}
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
              to="/admin/reports"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-[#eaf3f3] text-primary" : "text-gray-500 hover:bg-gray-50"} font-medium transition-colors`
              }
            >
              <span className="material-symbols-outlined text-[20px]">
                analytics
              </span>
              <span className="text-[13px]">Reports</span>
            </NavLink>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-[#eaf3f3] text-primary" : "text-gray-500 hover:bg-gray-50"} font-medium transition-colors`
              }
            >
              <span className="material-symbols-outlined text-[20px]">
                settings
              </span>
              <span className="text-[13px]">Settings</span>
            </NavLink>
          </nav>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#eaf3f3] flex items-center justify-center text-[#398e8e]">
              <span className="material-symbols-outlined text-[18px]">
                person
              </span>
            </div>
            <div>
              <p className="text-[13px] font-bold text-gray-800">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-[11px] text-gray-400 font-medium">
                {user?.roles[0].name}
              </p>
            </div>

            <div className="flex-1 flex justify-end">
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-[76px] px-8 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-[13px] font-medium text-gray-400">
            <span className="material-symbols-outlined text-[18px]">home</span>
            <span>/</span>
            <span className="text-gray-700">dashboard</span>
          </div>

          <div className="flex items-center gap-5">
            <button className="text-gray-400 hover:text-[#398e8e] transition-colors relative">
              <span className="material-symbols-outlined text-[22px]">
                notifications
              </span>
              <span className="absolute top-0 right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F7F6F2]"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="max-w-[1100px] mx-auto">
            {" "}
            {/* Hna zdt max-w bach maytjebeedch bezaf */}
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ClientAppLayout;