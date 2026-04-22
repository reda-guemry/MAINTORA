import { Outlet, NavLink } from "react-router-dom";
import { useLogout } from "@/features/auth/";
import { MaintoraLogo } from "@/shared/components/ui";
import { cn } from "@/shared/utils";

function TechnicianAppLayout() {

  const { logout } = useLogout() ;

  const navigationLinks = [
    {
      to: "/technician",
      label: "Dashboard",
      end: true,
    },
    {
      to: "/technician/map",
      label: "Map",
      end: false,
    },
  ];


  return (
    <div className="flex min-h-screen flex-col bg-[#f5f7f4]">
        {/* Header */}
        <header className="border-b border-[#dbe5e2] bg-white/95 shadow-sm backdrop-blur-md">
            <div className="flex flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/80 text-white">
                        <MaintoraLogo size={150} />
                    </div>
                    <div>
                        <h1 className="text-[13px] font-extrabold uppercase tracking-wide text-primary">
                            MAINTORA
                        </h1>
                        <p className="text-[10px] font-medium text-gray-400">
                            Technician Panel
                        </p>
                    </div>
                  </div>

                  <nav className="flex items-center gap-1 overflow-x-auto">
                    {navigationLinks.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                          cn(
                            "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                            isActive
                              ? "bg-[#e9f4f4] text-primary"
                              : "text-[#607776] hover:bg-[#f2f7f7] hover:text-text-main",
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </nav>
                </div>

                <div className="flex items-center gap-3 self-end lg:self-auto">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dbe5e2] bg-[#f7fbfb] text-[#6f8887]">
                    <span className="material-symbols-outlined text-[18px]">
                      notifications
                    </span>
                  </div>
                  <button
                      onClick={logout}
                      className="rounded-full border border-[#dbe5e2] px-4 py-2 text-sm font-semibold text-[#607776] transition-colors hover:bg-[#f2f7f7] hover:text-text-main"
                  >
                      Logout
                  </button>
                </div>
            </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-grow px-6 py-8">
            <Outlet />
        </main>
        
    </div>
  );
}

export default TechnicianAppLayout;
