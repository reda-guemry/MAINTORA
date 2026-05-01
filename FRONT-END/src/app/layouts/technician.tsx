import { Outlet, NavLink } from "react-router-dom";
import { useLogout } from "@/features/auth/";
import { MaintoraLogo } from "@/shared/components/ui";
import { cn } from "@/shared/utils";

function TechnicianAppLayout() {
  const { logout } = useLogout();

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-[#111818] font-sans">
      <header className="border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto flex w-[90%] items-center justify-between py-4">
          
          <div className="flex items-center gap-12">
            <MaintoraLogo
              to="/technician"
              size={28}
              showText
              title="MAINTORA"
              subtitle="Technician"
              wrapperClassName="flex items-center gap-2"
              markClassName="flex h-8 w-8 items-center justify-center rounded bg-[#3d8d8d] text-white"
              textClassName="flex flex-col"
              titleClassName="text-xs font-black tracking-widest text-[#111818]"
              subtitleClassName="text-[9px] font-bold text-[#64748b] uppercase"
              ariaLabel="Maintora"
            />

            <nav className="hidden items-center gap-8 md:flex">
              <NavLink
                to="/technician"
                end
                className={({ isActive }) =>
                  cn(
                    "text-sm font-bold transition-colors uppercase tracking-wider",
                    isActive ? "text-[#3d8d8d]" : "text-[#64748b] hover:text-[#111818]"
                  )
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/technician/map"
                className={({ isActive }) =>
                  cn(
                    "text-sm font-bold transition-colors uppercase tracking-wider",
                    isActive ? "text-[#3d8d8d]" : "text-[#64748b] hover:text-[#111818]"
                  )
                }
              >
                Map
              </NavLink>
              <NavLink
                to="/technician/calendar"
                className={({ isActive }) =>
                  cn(
                    "text-sm font-bold transition-colors uppercase tracking-wider",
                    isActive ? "text-[#3d8d8d]" : "text-[#64748b] hover:text-[#111818]"
                  )
                }
              >
                Calendar
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <NavLink
                to="/technician/profile"
                className={({ isActive }) => 
                  cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all overflow-hidden",
                    isActive ? "border-[#3d8d8d] bg-[#f0f9f8]" : "border-[#e2e8f0] bg-[#f1f5f9]"
                  )
                }
              >
                <span className="material-symbols-outlined text-[22px] text-[#3d8d8d]">account_circle</span>
              </NavLink>

            <button
              onClick={logout}
              className="text-sm font-bold uppercase tracking-wider text-[#64748b] hover:text-[#dc3545]"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[90%] grow py-8">
        <Outlet />
      </main>

      <div className="fixed bottom-0 left-0 flex w-full items-center justify-around border-t border-[#e2e8f0] bg-white py-3 md:hidden">
        <NavLink
          to="/technician"
          end
          className={({ isActive }) =>
            cn("transition-colors", isActive ? "text-[#3d8d8d]" : "text-[#64748b]")
          }
        >
          <span className="material-symbols-outlined text-[24px]">grid_view</span>
        </NavLink>
        <NavLink
          to="/technician/map"
          className={({ isActive }) =>
            cn("transition-colors", isActive ? "text-[#3d8d8d]" : "text-[#64748b]")
          }
        >
          <span className="material-symbols-outlined text-[24px]">map</span>
        </NavLink>
        <NavLink
          to="/technician/calendar"
          className={({ isActive }) =>
            cn("transition-colors", isActive ? "text-[#3d8d8d]" : "text-[#64748b]")
          }
        >
          <span className="material-symbols-outlined text-[24px]">calendar_today</span>
        </NavLink>
      </div>
    </div>
  );
}

export default TechnicianAppLayout;