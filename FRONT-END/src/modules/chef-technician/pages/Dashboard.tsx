export function Dashboard() {
  return (
    <div className="w-full space-y-6 md:space-y-8">

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Pending validation", "12 Reports", "fact_check", "#388E8E"],
          ["Active templates", "18", "description", "#6B7280"],
          ["Checklist items", "64", "checklist", "#6B7280"],
          ["Open anomalies", "07", "warning", "#EF4444"],
        ].map(([label, value, icon, iconColor]) => (
          <div
            key={label}
            className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md md:p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 md:text-[11px]">
                {label}
              </p>
              <span className="material-symbols-outlined text-[18px] md:text-[20px]" style={{ color: iconColor }}>
                {icon}
              </span>
            </div>
            <p className="mt-4 text-[32px] font-black leading-none tracking-tight text-[#1A1A1A] md:text-[36px]">
              {value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1.5fr] xl:gap-8">
        
        <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4 md:px-6 md:py-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A1A1A]">
              Pending Validation
            </p>
            <div className="flex h-6 items-center justify-center rounded-md bg-red-50 px-2.5 text-[10px] font-bold text-red-600 border border-red-100">
              4 NEW
            </div>
          </div>

          <div className="flex flex-col overflow-y-auto">
            {[
              ["RP-8929: HQ Inspection", "Anomaly review", "10:43"],
              ["RP-8930: Fire Alarm Test", "Field report", "11:40"],
              ["RP-8932: Emergency Exit Lighting", "Safety check", "13:20"],
              ["RP-8935: HVAC System Delta", "Monthly routine", "15:05"],
            ].map(([title, subtitle, time], index) => (
              <div
                key={title}
                className={`flex cursor-pointer items-start justify-between border-b border-gray-100 p-5 transition-colors last:border-0 hover:bg-gray-50 md:px-6 md:py-5 ${
                  index === 0 ? "relative bg-[#eef7f6]/30" : ""
                }`}
              >
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#388E8E]"></div>
                )}
                <div>
                  <p className="text-[13px] font-bold text-[#1A1A1A] md:text-[14px]">{title}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-gray-500 md:text-[12px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-300"></span>
                    {subtitle}
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-gray-100 px-2 py-1 text-[10px] font-bold text-gray-500 md:text-[11px]">
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Workspace details */}
        <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-6 md:px-8 md:py-6">
            <h2 className="text-[20px] font-black tracking-tight text-[#1A1A1A] md:text-[24px]">
              Report validation workspace
            </h2>
            <p className="mt-1 text-[13px] font-medium text-gray-500 md:text-[14px]">
              Snapshot inspired by your review flow and checklist operations.
            </p>
          </div>

          <div className="flex-1 p-6 md:p-8">
            <div className="grid gap-3 sm:grid-cols-3 md:gap-4">
              {[
                ["Asset name", "AHU-01 North Wing", "inventory_2"],
                ["Last maintenance", "Sept 22, 2023", "calendar_month"],
                ["Location", "Rooftop Section A", "location_on"],
              ].map(([label, value, icon]) => (
                <div key={label} className="flex flex-col rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-gray-400">
                      {icon}
                    </span>
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-500 md:text-[10px]">
                      {label}
                    </p>
                  </div>
                  <p className="mt-2 text-[13px] font-bold text-[#1A1A1A] md:mt-2 md:text-[14px]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-10">
              <div className="mb-4 flex items-center gap-2 md:mb-5">
                <span className="material-symbols-outlined text-[18px] text-[#388E8E] md:text-[20px]">
                  fact_check
                </span>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#388E8E]">
                  Inspection Checklist
                </h3>
              </div>
              
              <div className="space-y-3">
                {[
                  ["Check filter condition and replace if necessary", "done"],
                  ["Inspect fan belt for wear and proper tension", "done"],
                  ["Verify lubrication of motor and fan bearings", "done"],
                  ["Measure compressor refrigerant levels", "alert"],
                ].map(([line, state]) => (
                  <div
                    key={line}
                    className={`flex items-center justify-between gap-4 rounded-xl border p-4 text-[13px] font-medium transition-all md:p-4 md:text-[14px] ${
                      state === "alert"
                        ? "border-red-200 bg-red-50 text-red-700"
                        : "border-gray-200 bg-white text-[#1A1A1A]"
                    }`}
                  >
                    <span>{line}</span>
                    <span
                      className={`material-symbols-outlined shrink-0 text-[20px] md:text-[22px] ${
                        state === "alert" ? "text-red-500" : "text-[#388E8E]"
                      }`}
                    >
                      {state === "alert" ? "error" : "check_circle"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}