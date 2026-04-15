export default function StaticMachinesFleet() {
  return (
    <div 
      className="w-full min-h-screen p-12"
      style={{ 
        backgroundColor: "#F8F6F0",
        backgroundImage: "radial-gradient(#d1d1d1 1px, transparent 1px)",
        backgroundSize: "24px 24px" 
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-[54px] font-[900] text-[#1A1A1A] leading-[0.9] tracking-tighter mb-4">
              My Asset <br /> Fleet
            </h1>
            <div className="inline-flex items-center bg-[#DDEEEB] px-3 py-1 rounded">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#388E8E]">
                42 Registered Machines
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-5">
            <div className="flex gap-3">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <span className="text-sm">🔍</span>
                </div>
                <input 
                  type="text" 
                  placeholder="Search by asset name or ID..."
                  className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-md text-sm w-72 shadow-sm outline-none"
                />
              </div>
              {/* Dropdown */}
              <select className="bg-white border border-gray-200 rounded-md px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm outline-none">
                <option>Status: All Assets</option>
              </select>
            </div>
            
            {/* Action Button */}
            <button className="bg-[#388E8E] text-white px-8 py-3 rounded-md font-bold flex items-center gap-2 shadow-lg hover:bg-[#2d7272] transition-all">
              <span className="text-xl">+</span>
              Register New Machine
            </button>
          </div>
        </div>

        {/* --- TABLE SECTION --- */}
        <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Asset ID</th>
                <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Machine Name</th>
                <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Category/Type</th>
                <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Last Service</th>
                <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-50">
              {/* Row 1: Operational */}
              <tr className="hover:bg-[#F9FBFB] transition-colors group">
                <td className="px-8 py-5 font-mono text-[11px] text-gray-400">#CNC-2824-001</td>
                <td className="px-8 py-5 font-black text-[#1A1A1A] text-lg">Precision Mill Pro V4</td>
                <td className="px-8 py-5 text-sm text-gray-500 font-medium">CNC Milling Machine</td>
                <td className="px-8 py-5 text-sm text-gray-500 font-medium">Mar 12, 2024</td>
                <td className="px-8 py-5">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest bg-[#E6F4F1] text-[#388E8E] uppercase">
                    <span className="w-2 h-2 rounded-full bg-[#388E8E]"></span>
                    Operational
                  </span>
                </td>
                <td className="px-8 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-gray-400 mr-3">✏️</button>
                  <button className="text-red-300">🗑️</button>
                </td>
              </tr>

              {/* Row 2: Maintenance */}
              <tr className="hover:bg-[#F9FBFB] transition-colors group border-t border-gray-50">
                <td className="px-8 py-5 font-mono text-[11px] text-gray-400">#HYD-2824-012</td>
                <td className="px-8 py-5 font-black text-[#1A1A1A] text-lg">Hydraulic Press 50T</td>
                <td className="px-8 py-5 text-sm text-gray-500 font-medium">Fabrication Unit</td>
                <td className="px-8 py-5 text-sm text-gray-500 font-medium">Feb 28, 2024</td>
                <td className="px-8 py-5">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest bg-[#FFF4E5] text-[#E67E22] uppercase">
                    <span className="w-2 h-2 rounded-full bg-[#E67E22]"></span>
                    Maintenance
                  </span>
                </td>
                <td className="px-8 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-gray-400 mr-3">✏️</button>
                  <button className="text-red-300">🗑️</button>
                </td>
              </tr>

              {/* Row 3: Offline */}
              <tr className="hover:bg-[#F9FBFB] transition-colors group border-t border-gray-50">
                <td className="px-8 py-5 font-mono text-[11px] text-gray-400">#LSR-2824-005</td>
                <td className="px-8 py-5 font-black text-[#1A1A1A] text-lg">Laser Cutter Alpha-G</td>
                <td className="px-8 py-5 text-sm text-gray-500 font-medium">Precision Cutting</td>
                <td className="px-8 py-5 text-sm text-gray-500 font-medium">Jan 15, 2024</td>
                <td className="px-8 py-5">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest bg-[#F2F2F2] text-[#555555] uppercase">
                    <span className="w-2 h-2 rounded-full bg-[#999999]"></span>
                    Offline
                  </span>
                </td>
                <td className="px-8 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-gray-400 mr-3">✏️</button>
                  <button className="text-red-300">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* --- FOOTER / PAGINATION --- */}
          <div className="px-8 py-6 flex items-center justify-between border-t border-gray-50">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">
              Showing 1-4 of 42 assets
            </span>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 border border-gray-200 rounded text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-1.5 border border-gray-200 rounded text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}