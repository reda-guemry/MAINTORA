export function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="rounded-[26px] border border-[#d9d1c5] bg-[linear-gradient(180deg,#eee7da_0%,#ece2d3_100%)] px-6 py-7 shadow-[0_18px_45px_rgba(62,52,39,0.08)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#8f8477]">
          Maintenance Overview
        </p>
        <h1 className="mt-3 text-[34px] font-black tracking-tight text-[#2d241c] md:text-[40px]">
          Chef technician dashboard for preventive control.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6f6254]">
          Track inspections, align templates, and keep the team ready for every
          field round with a cleaner command surface.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Pending validation", "12 Reports"],
          ["Active templates", "18"],
          ["Checklist items", "64"],
          ["Open anomalies", "07"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-[22px] border border-[#ddd5c8] bg-white px-5 py-5 shadow-[0_16px_40px_rgba(62,52,39,0.07)]"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#998d7e]">
              {label}
            </p>
            <p className="mt-4 text-[32px] font-black tracking-tight text-[#2d241c]">
              {value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_1.35fr]">
        <div className="rounded-[24px] border border-[#ddd5c8] bg-white shadow-[0_16px_40px_rgba(62,52,39,0.07)]">
          <div className="border-b border-[#f0ebe2] px-5 py-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#998d7e]">
              Pending Validation
            </p>
          </div>

          <div className="divide-y divide-[#f0ebe2]">
            {[
              ["RP-8929: HQ Inspection", "Anomaly review", "10:43"],
              ["RP-8930: Fire Alarm Test", "Field report", "11:40"],
              ["RP-8932: Emergency Exit Lighting", "Safety check", "13:20"],
            ].map(([title, subtitle, time], index) => (
              <div
                key={title}
                className={`px-5 py-4 ${
                  index === 0 ? "bg-[#eef7f7]" : "bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[#2d241c]">{title}</p>
                    <p className="mt-1 text-[12px] text-[#7f7468]">
                      {subtitle}
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-[#9b8f80]">
                    {time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-[#ddd5c8] bg-white shadow-[0_16px_40px_rgba(62,52,39,0.07)]">
          <div className="border-b border-[#f0ebe2] px-5 py-4">
            <h2 className="text-xl font-black text-[#2d241c]">
              Report validation workspace
            </h2>
            <p className="mt-1 text-sm text-[#7f7468]">
              Snapshot inspired by your review flow and checklist operations.
            </p>
          </div>

          <div className="space-y-5 px-5 py-5">
            <div className="grid gap-3 md:grid-cols-3">
              {[
                ["Asset name", "AHU-01 North Wing"],
                ["Last maintenance", "Sept 22, 2023"],
                ["Location", "Rooftop Section A"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-[#f7f3ec] px-4 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a09282]">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-bold text-[#2d241c]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.16em] text-[#4b9c99]">
                Inspection Checklist
              </h3>
              <div className="mt-3 space-y-2">
                {[
                  ["Check filter condition and replace if necessary", "done"],
                  ["Inspect fan belt for wear and proper tension", "done"],
                  ["Verify lubrication of motor and fan bearings", "done"],
                  ["Measure compressor refrigerant levels", "warning"],
                ].map(([line, state]) => (
                  <div
                    key={line}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${
                      state === "warning"
                        ? "border-[#f1d7b3] bg-[#fff5e8] text-[#9a5b19]"
                        : "border-[#dcece9] bg-[#f8fcfb] text-[#2d241c]"
                    }`}
                  >
                    <span>{line}</span>
                    <span className="material-symbols-outlined text-[18px]">
                      {state === "warning" ? "warning" : "check_circle"}
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
