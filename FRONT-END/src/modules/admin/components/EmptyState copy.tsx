import { formatNumber } from "@/features/admin-dashboard/utils/dashboardHelper";
import { cn } from "@/shared";

function StatCard({ icon, label, value, danger = false }: any) {
  return (
    <div className={cn(
      "flex flex-col justify-between rounded-[28px] border bg-white p-6 transition-all",
      danger ? "border-red-100 shadow-sm shadow-red-50" : "border-slate-100"
    )}>
      <div className={cn(
        "mb-5 flex h-11 w-11 items-center justify-center rounded-2xl",
        danger ? "bg-red-50 text-red-500" : "bg-teal-50 text-[#43968C]"
      )}>
        <span className="material-symbols-outlined text-[22px]">{icon}</span>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <h3 className="mt-1 text-3xl font-black text-slate-900">{formatNumber(value)}</h3>
      </div>
    </div>
  );
}

export default StatCard;