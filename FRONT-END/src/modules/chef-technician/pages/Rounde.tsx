import { useState } from "react";
import { AssetMap } from "../components/AssetMap";

export function Rounde() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const activeAssets = [
    { lng: -7.5898, lat: 33.5731, status: 'critical' as const },
    { lng: -7.5950, lat: 33.5780, status: 'optimal' as const },
    { lng: -7.5850, lat: 34.5680, status: 'warning' as const },
  ];

  return (
    <div className="flex h-[calc(100vh-80px)] w-full overflow-hidden bg-[#F8F6F0]">
      
      <aside 
        className={`transition-all duration-300 ease-in-out bg-white border-r border-[#E2E2D1] shadow-xl z-20 flex flex-col
          ${isSidebarOpen ? "w-80" : "w-0 overflow-hidden"}`}
      >
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-[14px] font-black uppercase tracking-widest text-[#1A1A1A]">Active Tasks</h3>
          <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-[10px] font-black">4 PENDING</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border border-gray-100 rounded-lg hover:border-[#388E8E] cursor-pointer transition-all bg-[#FCFBFA]">
              <div className="flex justify-between mb-2">
                <span className="text-[10px] font-black text-red-500 uppercase">Critical</span>
                <span className="text-[10px] text-gray-400">Due: 2h</span>
              </div>
              <h4 className="text-sm font-bold text-[#2D241C]">Main Compressor Overheat</h4>
              <p className="text-[11px] text-gray-500 mt-1 uppercase tracking-tight font-medium">Zone C - Assembly Line 2</p>
              <button className="w-full mt-3 py-2 bg-[#388E8E] text-white text-[10px] font-black uppercase rounded">Assign Now</button>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Map Content */}
      <div className="flex-1 relative">
        {/* Toggle Button */}
        <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="absolute left-4 top-4 z-30 bg-white border border-[#E2E2D1] p-2 rounded-md shadow-md hover:bg-gray-50 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">
            {isSidebarOpen ? "menu_open" : "menu"}
          </span>
        </button>

        <div className="w-full h-full">
          <AssetMap markers={activeAssets} />
        </div>

        <div className="absolute bottom-8 right-8 w-64 bg-white border border-[#E2E2D1] rounded-xl shadow-2xl p-5 z-10">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nearby Technicians</h5>
            <span className="text-[10px] text-[#388E8E] font-bold cursor-pointer underline">VIEW ALL</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black text-[#388E8E] border border-gray-200">AR</div>
              <div>
                <p className="text-xs font-bold">Alex Rivers</p>
                <p className="text-[10px] text-gray-400">Maint. Lv 3 • 40m away</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.4; }
          70% { transform: scale(3); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}