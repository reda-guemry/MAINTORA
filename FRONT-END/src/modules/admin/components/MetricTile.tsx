import { formatNumber } from "@/features/admin-dashboard/utils/dashboardHelper";
import { cn } from "@/shared";

function MetricTile({ label, value, icon, warning = false }: any) {
  return (
    <div className="rounded-2xl border border-slate-100 p-5 transition-colors hover:border-[#43968C]/30">
      <div className="mb-4 flex items-center justify-between">
        <span className={cn(
          "material-symbols-outlined text-[20px]",
          warning ? "text-amber-500" : "text-[#43968C]"
        )}>{icon}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Stat</span>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-black text-slate-900">{formatNumber(value)}</p>
    </div>
  );
}

export default MetricTile; 