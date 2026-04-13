import React from "react";

function UsersPage() {
  return (
    <div className="space-y-6">
      
      {/* Page Header Area */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            User Management
          </h1>
          <p className="text-sm text-gray-500 mt-1.5">
            Configure user access levels and system permissions.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#398e8e] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#2d7373] transition-colors shadow-sm">
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Add New User
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-8 text-sm font-medium">
          <a href="#" className="text-[#398e8e] border-b-2 border-[#398e8e] pb-4 px-1">
            All Members (42)
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700 pb-4 px-1 transition-colors">
            Administrators
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700 pb-4 px-1 transition-colors">
            Technicians
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700 pb-4 px-1 transition-colors">
            Pending Invites
          </a>
        </nav>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          
          {/* Table Header */}
          <thead className="bg-white border-b border-gray-100">
            <tr>
              <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[15%]">User ID</th>
              <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[35%]">Name</th>
              <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[20%]">Role</th>
              <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[15%]">Status</th>
              <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[15%] text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            
            {/* Row 1: John Doe */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="py-4 px-6 text-[13px] font-medium text-gray-400">#USR-2940</td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#eaf3f3] text-[#398e8e] flex items-center justify-center font-bold text-sm">
                    JD
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-gray-800">John Doe</p>
                    <p className="text-[12px] text-gray-500">john.doe@industrial.co</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-[#eaf3f3] text-[#398e8e]">
                  Admin
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[13px] font-semibold text-gray-700">Active</span>
                </div>
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-1.5 text-gray-400 hover:text-[#398e8e] transition-colors rounded">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>

            {/* Row 2: Mike Smith */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="py-4 px-6 text-[13px] font-medium text-gray-400">#USR-2941</td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-sm">
                    MS
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-gray-800">Mike Smith</p>
                    <p className="text-[12px] text-gray-500">m.smith@field-ops.net</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600">
                  Technician
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[13px] font-semibold text-gray-700">Active</span>
                </div>
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-1.5 text-gray-400 hover:text-[#398e8e] transition-colors rounded">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>

            {/* Row 3: Sarah Jenkins */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="py-4 px-6 text-[13px] font-medium text-gray-400">#USR-2942</td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-sm">
                    SJ
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-gray-800">Sarah Jenkins</p>
                    <p className="text-[12px] text-gray-500">jenkins.s@enterprise.com</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600">
                  Technician
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <span className="text-[13px] font-semibold text-gray-400">Inactive</span>
                </div>
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-1.5 text-gray-400 hover:text-[#398e8e] transition-colors rounded">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>

            {/* Row 4: Robert Chen */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="py-4 px-6 text-[13px] font-medium text-gray-400">#USR-2943</td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-sm">
                    RC
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-gray-800">Robert Chen</p>
                    <p className="text-[12px] text-gray-500">r.chen@vendor.net</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600">
                  Guest
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[13px] font-semibold text-gray-700">Active</span>
                </div>
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-1.5 text-gray-400 hover:text-[#398e8e] transition-colors rounded">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>

          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="bg-white border-t border-gray-100 px-6 py-4 flex items-center justify-between">
          <p className="text-[13px] text-gray-500">
            Showing <span className="font-bold text-gray-700">1-4</span> of <span className="font-bold text-gray-700">42</span> users
          </p>
          <div className="flex items-center gap-1.5">
            <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50">
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded bg-[#398e8e] text-white text-[13px] font-bold">
              1
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 text-[13px] font-medium">
              2
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 text-[13px] font-medium">
              3
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50">
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>

      </div>

      {/* Very Bottom System Info Footer */}
      <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 tracking-widest uppercase mt-8 pb-4">
        <div className="flex gap-8">
          <span>SESSION: CMMS-ADMIN-PRV-93</span>
          <span>SERVER: AWS-US-EAST-1</span>
        </div>
        <span>LAST SYSTEM SYNC: 2023-11-24 14:32:01 UTC</span>
      </div>

    </div>
  );
}

export default UsersPage;