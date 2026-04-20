import { Outlet } from "react-router-dom";
import { useLogout } from "@/features/auth/";
import { MaintoraLogo } from "@/shared/components/ui";

function TechnicianAppLayout() {

  const { logout } = useLogout() ;


  return (
    <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/80 rounded-lg flex items-center justify-center text-white">
                        <MaintoraLogo size={150} />
                    </div>
                    <div>
                        <h1 className="text-[13px] font-extrabold text-primary uppercase tracking-wide">
                            MAINTORA
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium">
                            Technician Panel
                        </p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                    Logout
                </button>
            </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-grow container mx-auto px-6 py-8">
            <Outlet />
        </main>
        
    </div>
  );
}

export default TechnicianAppLayout;
