import { Outlet } from "react-router-dom";

function ClientAppLayout() {
  return (
    <div className="font-display bg-[#F8F6F0] text-slate-900 min-h-screen flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-md z-30">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#398e8e] text-white">
              <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-800 uppercase">
              CMMS<span className="font-light text-[#398e8e]">Core</span>
            </span>
          </div>
          <div className="h-6 w-[1px] bg-slate-300 hidden md:block"></div>
          <h2 className="hidden md:block text-sm font-semibold text-slate-500 uppercase tracking-widest">Executive Dashboard</h2>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-[#b91c1c]"></span>
          </button>
          <div className="flex items-center gap-3 pl-2 border-l border-slate-100">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900">Alex Sterling</p>
              <p className="text-[10px] text-slate-500 uppercase">Chief Operations Officer</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white ring-1 ring-slate-200 overflow-hidden">
              <div className="w-full h-full bg-[#398e8e]/20 flex items-center justify-center text-[#398e8e]">
                <span className="material-symbols-outlined">person</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Menu */}
        <aside className="w-64 border-r border-slate-200 bg-white/50 p-6 hidden lg:flex flex-col gap-8 z-20">
          <nav className="flex flex-col gap-1">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Navigation</p>
            <a className="flex items-center gap-3 rounded-lg bg-[#398e8e]/10 px-3 py-2.5 text-[#398e8e]" href="#">
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              <span className="text-sm font-semibold">Overview</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg" href="#">
              <span className="material-symbols-outlined text-[20px]">analytics</span>
              <span className="text-sm font-medium">Fleet Analytics</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg" href="#">
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
              <span className="text-sm font-medium">Asset Catalog</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg" href="#">
              <span className="material-symbols-outlined text-[20px]">assignment</span>
              <span className="text-sm font-medium">Maintenance Logs</span>
            </a>
          </nav>

          <nav className="flex flex-col gap-1">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Configuration</p>
            <a className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg" href="#">
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span className="text-sm font-medium">Site Settings</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg" href="#">
              <span className="material-symbols-outlined text-[20px]">help</span>
              <span className="text-sm font-medium">Support Center</span>
            </a>
          </nav>

          <div className="mt-auto rounded-xl bg-[#398e8e]/5 p-4 border border-[#398e8e]/10">
            <p className="text-xs font-bold text-[#398e8e] uppercase mb-1">System Status</p>
            <p className="text-[10px] text-slate-500 mb-3 leading-tight">All monitoring nodes are operational.</p>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] font-medium text-emerald-600 uppercase">Live Link Active</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8 relative">
           {/* Grid Background Overlay */}
           <div className="absolute inset-0 z-0 pointer-events-none opacity-40" 
                style={{backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '24px 24px'}}>
           </div>
           
           <div className="relative z-10">
              <Outlet />
           </div>
        </main>
      </div>
    </div>
  );
}

export default ClientAppLayout;