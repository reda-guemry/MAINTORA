import React from "react";

function DashboardPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Page Title Row */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800">Fleet Status Overview</h1>
          <p className="mt-1 text-slate-500">Real-time preventive maintenance and machine health diagnostics.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <span className="material-symbols-outlined text-[20px]">file_download</span>
            Export Report
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-[#398e8e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#398e8e]/90">
            <span className="material-symbols-outlined text-[20px]">refresh</span>
            Live Sync
          </button>
        </div>
      </div>

      {/* Top Row: Summary Stats */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Fleet Health Score (SVG Donut) */}
        <div className="col-span-12 lg:col-span-4 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Fleet Health Score</h3>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative h-48 w-48">
              <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 100 100">
                <circle className="stroke-slate-100" cx="50" cy="50" fill="transparent" r="40" strokeWidth="8"></circle>
                <circle className="stroke-[#398e8e]" cx="50" cy="50" fill="transparent" r="40" strokeWidth="8"
                        strokeDasharray="251.2" strokeDashoffset="40" strokeLinecap="round"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center rotate-[0deg]">
                <span className="text-4xl font-black text-slate-800">84%</span>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-tighter">Good Standing</span>
              </div>
            </div>
            <div className="mt-6 flex w-full justify-between border-t border-slate-50 pt-4">
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Target</p>
                <p className="text-sm font-bold text-slate-700">92%</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Last Week</p>
                <p className="text-sm font-bold text-slate-700">81%</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Trend</p>
                <p className="text-sm font-bold text-emerald-600">+3.1%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Open Anomalies Card */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 rounded-2xl bg-white p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Open Anomalies</h3>
            <p className="text-xs text-slate-500">Requires immediate supervisor review.</p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex h-16 w-20 items-center justify-center rounded-xl bg-[#b91c1c] text-white">
              <span className="text-3xl font-black">12</span>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-700">High Risk: <span className="text-[#b91c1c] font-black">04</span></p>
              <p className="text-xs font-medium text-slate-500">Scheduled Repair: 08</p>
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full rounded-lg bg-slate-100 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors uppercase tracking-widest">
              View Discrepancies
            </button>
          </div>
        </div>

        {/* Operating Hours Card */}
        <div className="col-span-12 md:col-span-6 lg:col-span-5 rounded-2xl bg-slate-900 p-6 shadow-sm border border-slate-800 text-white flex flex-col">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Monthly Uptime</h3>
              <p className="text-3xl font-black">99.4%</p>
            </div>
            <span className="material-symbols-outlined text-[#398e8e] text-4xl">energy_savings_leaf</span>
          </div>
          <div className="mt-auto">
            <div className="mb-2 flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Load Efficiency</span>
              <span className="text-slate-200 font-bold">88/100</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full w-[88%] bg-[#398e8e]"></div>
            </div>
            <div className="mt-4 flex gap-4">
              <div className="flex-1 rounded-lg bg-slate-800/50 p-3 border border-slate-700/50">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Avg Run Temp</p>
                <p className="text-lg font-bold">42.8°C</p>
              </div>
              <div className="flex-1 rounded-lg bg-slate-800/50 p-3 border border-slate-700/50">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Idle Ratio</p>
                <p className="text-lg font-bold">14.2%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Health Table-like Section */}
      <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Individual Asset Health</h2>
            <p className="text-sm text-slate-500">Breakdown of performance indicators per primary machine.</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
            <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-full bg-[#398e8e]"></div><span className="text-slate-600">Optimal</span></div>
            <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-full bg-[#d97706]"></div><span className="text-slate-600">Caution</span></div>
            <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-full bg-[#b91c1c]"></div><span className="text-slate-600">Critical</span></div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Asset Rows (Static) */}
          {[
            { name: "Main Pumping Station", sn: "MPS-442-B", health: 96, status: "Stable", color: "bg-[#398e8e]", text: "text-emerald-700", bg: "bg-emerald-100" },
            { name: "CNC Router - Unit 4", sn: "CNC-892-X", health: 62, status: "Vibration Warning", color: "bg-[#d97706]", text: "text-amber-700", bg: "bg-amber-100" },
            { name: "Hydraulic Press A1", sn: "HPA-001-Z", health: 24, status: "Overheating", color: "bg-[#b91c1c]", text: "text-red-700", bg: "bg-red-100" },
            { name: "Assembly Line Conveyor", sn: "CONV-339-L", health: 88, status: "Optimal", color: "bg-[#398e8e]", text: "text-emerald-700", bg: "bg-emerald-100" },
          ].map((asset, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 border-b border-slate-50 pb-6 last:border-0 last:pb-0">
              <div className="w-56 shrink-0">
                <p className="text-sm font-bold text-slate-800">{asset.name}</p>
                <p className="text-[10px] text-slate-400 uppercase">S/N: {asset.sn}</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Health Index</span>
                  <span className="text-xs font-bold text-slate-700">{asset.health}%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner">
                  <div className={`h-full ${asset.color} rounded-full transition-all duration-1000`} style={{ width: `${asset.health}%` }}></div>
                </div>
              </div>
              <div className="flex w-32 md:justify-end">
                <span className={`rounded px-2.5 py-1 text-[10px] font-bold uppercase ${asset.bg} ${asset.text}`}>
                  {asset.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Table */}
      <div className="mt-8 grid grid-cols-12 gap-6 pb-12">
        <div className="col-span-12 lg:col-span-12 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4">Upcoming Maintenance Schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400">
                  <th className="py-3 px-2">Asset Name</th>
                  <th className="py-3 px-2">Task Type</th>
                  <th className="py-3 px-2">Assigned Specialist</th>
                  <th className="py-3 px-2">Scheduled Time</th>
                  <th className="py-3 px-2">Priority</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-2 font-bold text-slate-700">Compressor Unit 3</td>
                  <td className="py-4 px-2 text-slate-500">Oil Change & Filter</td>
                  <td className="py-4 px-2 text-slate-700">Marcos G.</td>
                  <td className="py-4 px-2 text-slate-500">Oct 24, 08:00</td>
                  <td className="py-4 px-2"><span className="px-2 py-1 rounded bg-slate-100 text-slate-600 font-bold uppercase text-[9px]">Normal</span></td>
                </tr>
                <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-2 font-bold text-slate-700">Hydraulic Press A1</td>
                  <td className="py-4 px-2 text-slate-500">Seal Replacement</td>
                  <td className="py-4 px-2 text-slate-700">Team Delta</td>
                  <td className="py-4 px-2 text-slate-500">Oct 24, ASAP</td>
                  <td className="py-4 px-2"><span className="px-2 py-1 rounded bg-red-100 text-red-600 font-bold uppercase text-[9px]">Critical</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;