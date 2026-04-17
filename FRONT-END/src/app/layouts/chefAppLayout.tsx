import { useAuth } from "@/context/useAuth";
import { useLogout } from "@/features/auth";
import { NavElement } from "@/modules/chef-technician/components/NavElement";
import { MaintoraLogo } from "@/shared/components/ui";
import { Outlet } from "react-router-dom";

export function ChefAppLayout() {
  const { user } = useAuth();
  const { logout } = useLogout();


  return (
    <div className="min-h-screen flex flex-col font-sans text-[#1A1A1A] bg-[#F8F6F0]" >
      
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E2E2D1] shadow-sm">
        <div className="max-w-360 mx-auto px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#388E8E] text-white shadow-sm">
                <MaintoraLogo />
              </div>
              <h2 className="text-[14px] font-black  tracking-tighter text-[#1A1A1A] uppercase">
                Maintora
              </h2>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <NavElement to="/chef-technician" label="Dashboard" end />
              <NavElement to="/chef-technician/checklist/templates" label="Checklists" />
              
              <div className="w-px h-4 bg-gray-200 mx-3" />
              
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-3">Assets</span>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-3">Calendar</span>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-[#388E8E] transition-colors relative">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-gray-100 mx-1" />

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#388E8E]/20 bg-white text-[12px] font-black text-[#388E8E] shadow-sm">
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </div>
              <button
                type="button"
                onClick={logout}
                className="hidden sm:block text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="lg:hidden border-t border-gray-50 bg-[#FBFBFB] px-4 py-2 overflow-x-auto no-scrollbar">
          <div className="flex gap-6">
            <NavElement to="/chef-technician" label="Dashboard" end />
            <NavElement to="/chef-technician/checklist/templates" label="Checklists" />
          </div>
        </div>
      </header>

      <main 
        className="flex-1 relative bg-[#F8F6F0] overflow-y-auto"

      >
        <div className="max-w-360 mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}