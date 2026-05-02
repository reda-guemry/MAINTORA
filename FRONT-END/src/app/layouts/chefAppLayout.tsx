import { useAuth } from "@/context/useAuth";
import { useLogout } from "@/features/auth";
import { NavElement } from "@/modules/chef-technician/components/NavElement";
import { MaintoraLogo } from "@/shared/components/ui";
import { NavLink, Outlet } from "react-router-dom";

export function ChefAppLayout() {
  const { user } = useAuth();
  const { logout } = useLogout();

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F6F0] font-sans text-[#1A1A1A]">
      <header className="sticky top-0 z-50 border-b border-[#E2E2D1] bg-white/80 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-400 items-center justify-between px-4 md:h-16 md:px-6">
          <div className="flex items-center gap-6 md:gap-10">
            <MaintoraLogo
              to="/chef-technician"
              size={28}
              showText
              title="Maintora"
              wrapperClassName="flex items-center gap-2 md:gap-3"
              markClassName="flex h-8 w-8 items-center justify-center rounded-lg bg-[#388E8E] text-white shadow-sm md:h-9 md:w-9"
              textClassName="flex flex-col"
              titleClassName="text-[13px] font-black uppercase tracking-tighter text-[#1A1A1A] md:text-[14px]"
              ariaLabel="Go to chef technician dashboard"
            />

            <nav className="hidden items-center gap-1 lg:flex">
              <NavElement to="/chef-technician" label="Dashboard" end />
              <NavElement
                to="/chef-technician/maintenance-cycles"
                label="Automation"
              />
              <NavElement
                to="/chef-technician/checklist/templates"
                label="Checklists"
              />
              <NavElement to="/chef-technician/mape" label="Map" />
              <NavElement to="/chef-technician/anomalies" label="Anomalies" />
            </nav>
          </div>

          <div className="flex items-center gap-3 md:gap-4">

            <div className="mx-0.5 h-6 w-px bg-gray-200 md:mx-1 md:h-8" />

            <div className="flex items-center gap-2 md:gap-3">
              <NavLink
                to="/chef-technician/profile"
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#388E8E]/20 bg-white text-[11px] font-black text-[#388E8E] shadow-sm transition-colors hover:bg-[#eef7f6] md:h-9 md:w-9 md:text-[12px]"
                aria-label="Edit profile"
              >
                {user?.first_name?.[0]}
                {user?.last_name?.[0]}
              </NavLink>
              <button
                type="button"
                onClick={logout}
                className="hidden text-[10px] font-black uppercase tracking-widest text-gray-500 transition-colors hover:text-red-500 sm:block md:text-[11px]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="no-scrollbar overflow-x-auto border-t border-gray-100 bg-[#FBFBFB] px-4 py-2 lg:hidden">
          <div className="flex gap-4 md:gap-6">
            <NavElement to="/chef-technician" label="Dashboard" end />
            <NavElement
              to="/chef-technician/maintenance-cycles"
              label="Automation"
            />
            <NavElement
              to="/chef-technician/checklist/templates"
              label="Checklists"
            />
            <NavElement to="/chef-technician/mape" label="Map" />
            <NavElement to="/chef-technician/anomalies" label="Anomalies" />
          </div>
        </div>
      </header>

      <main className="relative flex-1 overflow-y-auto bg-[#F8F6F0]">
        <div className="mx-auto h-full w-full max-w-400 p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
