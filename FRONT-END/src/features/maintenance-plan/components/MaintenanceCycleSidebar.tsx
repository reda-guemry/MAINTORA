import type { MaintenanceCycleSidebarProps } from "../types/maintenancePlan";


export function MaintenanceCycleSidebar({ stats }: MaintenanceCycleSidebarProps) {
  return (
    <aside className="space-y-5">
      <section className="rounded-xl border border-[#dfe8e6] bg-white p-5 shadow-[0_16px_40px_rgba(17,24,39,0.08)]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#388E8E]">
            monitoring
          </span>
          <h2 className="text-sm font-black text-[#172033]">Fleet Health</h2>
        </div>

        <div className="mt-5 rounded-lg bg-[#f5f8f8] p-4">
          <div className="flex items-end justify-between gap-3">
            <span className="text-[11px] font-black uppercase tracking-[0.12em] text-[#6f7f8f]">
              Automated Assets
            </span>
            <span className="text-2xl font-black text-[#172033]">
              {stats.automatedAssetsPercent}%
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#d8e4e2]">
            <div
              className="h-full rounded-full bg-[#388E8E] transition-all duration-500"
              style={{ width: `${stats.automatedAssetsPercent}%` }}
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-[#f5f8f8] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#6f7f8f]">
              Active Cycles
            </p>
            <p className="mt-1 text-2xl font-black text-[#388E8E]">
              {stats.activeCycles}
            </p>
          </div>
          <div className="rounded-lg bg-[#f5f8f8] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#6f7f8f]">
              Pending
            </p>
            <p className="mt-1 text-2xl font-black text-[#8b98a8]">
              {stats.pendingAssets}
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-xl bg-[#101828] p-5 text-white shadow-[0_16px_40px_rgba(16,24,40,0.16)]">
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#5ec0be]">
              info
            </span>
            <h2 className="text-sm font-black">Smart Scheduling</h2>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-[#aeb8c6]">
            Automating cycles reduces manual overhead by keeping future rounds
            aligned with your preventive maintenance standards.
          </p>
        </div>
        <span className="material-symbols-outlined absolute -bottom-6 -right-4 text-[112px] text-white/10">
          key
        </span>
      </section>
    </aside>
  );
}
