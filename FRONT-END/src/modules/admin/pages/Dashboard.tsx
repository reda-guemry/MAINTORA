
function Dashboard() {
  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#eaf3f3] text-[#398e8e]">
              <span className="material-symbols-outlined text-[20px]">settings</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
              +2.4%
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Active Machines</p>
            <h3 className="text-[28px] leading-none font-bold text-gray-800">1,284</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#eaf3f3] text-[#398e8e]">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
              +1.2%
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Users</p>
            <h3 className="text-[28px] leading-none font-bold text-gray-800">856</h3>
          </div>
        </div>

        {/* Card 3 (Alert) */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-red-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-red-50 text-red-500">
              <span className="material-symbols-outlined text-[20px]">error</span>
            </div>
            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md">
              -5.3%
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Open Anomalies</p>
            <h3 className="text-[28px] leading-none font-bold text-gray-800">42</h3>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#eaf3f3] text-[#398e8e]">
              <span className="material-symbols-outlined text-[20px]">task_alt</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
              +8.7%
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Rounds Completed</p>
            <h3 className="text-[28px] leading-none font-bold text-gray-800">3,105</h3>
          </div>
        </div>

      </div>

      {/* Chart Section */}
      <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-[16px] font-bold text-gray-800">System Activity Overview</h2>
            <p className="text-[12px] text-gray-400 mt-1">Maintenance events and round logs over last 30 days</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors">
              EXPORT PDF
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-[#2d7373] transition-colors">
              FILTER VIEW
            </button>
          </div>
        </div>

        <div className="relative h-55 w-full">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 250">
            <defs>
              <linearGradient id="curveGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#398e8e" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#398e8e" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,180 C200,160 300,220 500,100 C700,-20 800,180 1000,100 V250 H0 Z" fill="url(#curveGradient)" />
            <path d="M0,180 C200,160 300,220 500,100 C700,-20 800,180 1000,100" fill="none" stroke="#398e8e" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="300" cy="198" fill="#398e8e" r="4" />
            <circle cx="500" cy="100" fill="#398e8e" r="4" />
          </svg>
          <div className="flex justify-between mt-3 text-[10px] font-bold text-gray-300 uppercase tracking-widest border-t border-gray-50 pt-3">
            <span>DAY 01</span>
            <span>DAY 07</span>
            <span>DAY 14</span>
            <span>DAY 21</span>
            <span>DAY 30</span>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-[11px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-[#398e8e] text-[16px]">history</span>
            RECENT ACTIVITY FEED
          </h2>
          <span className="text-[9px] font-mono font-medium text-[#398e8e]/60 tracking-widest uppercase">
            AUTO_REFRESH: ACTIVE
          </span>
        </div>

        <div className="divide-y divide-gray-50">
          {/* Feed Item 1 */}
          <div className="p-4 px-6 flex items-center gap-4 hover:bg-gray-50/50 transition-colors group">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
            <div className="flex-1">
              <p className="text-[13px] text-gray-800 font-semibold">Compressor C-12 Round Completed</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Technician: Mark Stevens • Area: Zone 4 • 12 mins ago</p>
            </div>
            <button className="text-[10px] font-bold text-[#398e8e] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              VIEW REPORT
            </button>
          </div>

          {/* Feed Item 2 */}
          <div className="p-4 px-6 flex items-center gap-4 hover:bg-gray-50/50 transition-colors group">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
            <div className="flex-1">
              <p className="text-[13px] text-gray-800 font-semibold">Anomaly Detected: High Vibration</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Asset: Turbine T-08 • Severity: CRITICAL • 45 mins ago</p>
            </div>
            <button className="text-[10px] font-bold text-[#398e8e] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              RESPOND
            </button>
          </div>

          {/* Feed Item 3 */}
          <div className="p-4 px-6 flex items-center gap-4 hover:bg-gray-50/50 transition-colors group">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
            <div className="flex-1">
              <p className="text-[13px] text-gray-800 font-semibold">User Profile Updated</p>
              <p className="text-[11px] text-gray-400 mt-0.5">User: Sarah Connor • Role: Maintenance Supervisor • 1.5 hours ago</p>
            </div>
            <button className="text-[10px] font-bold text-[#398e8e] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              DETAILS
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard ;