import type { MachineTableRowProps } from "../types/machineComponents";
import { MachineStatusBadge } from "./MachineStatusBadge";

export function MachineTableRow({
  machine,
  onEdit,
  onDelete,
  onHistory,
}: MachineTableRowProps) {
  return (
    <tr className="group transition-colors hover:bg-slate-50/80">
      <td className="px-6 py-4 font-mono text-[11px] font-medium text-slate-500">
        #{machine.code}
      </td>
      <td className="px-6 py-4">
        <p className="text-[14px] font-bold text-slate-900">
          {machine.name}
        </p>
        <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Machine #{machine.id}
        </p>
      </td>
      <td className="px-6 py-4 text-sm font-medium text-slate-600">
        {machine.location || "No location"}
      </td>
      <td className="px-6 py-4">
        <MachineStatusBadge status={machine.status} />
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-1.5 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
          {onHistory && (
            <button
              type="button"
              onClick={() => onHistory(machine)}
              className="rounded-xl p-2 text-slate-400 transition-all  hover:text-[#43968C]"
              aria-label={`View history for ${machine.name}`}
            >
              <span className="material-symbols-outlined text-[18px]">
                history
              </span>
            </button>
          )}
          <button
            type="button"
            onClick={() => onEdit(machine)}
            className="rounded-xl p-2 text-slate-400 transition-all  hover:text-[#43968C]"
            aria-label={`Edit ${machine.name}`}
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button
            type="button"
            onClick={() => onDelete(machine)}
            className="rounded-xl p-2 text-slate-400 transition-all  hover:text-red-600"
            aria-label={`Delete ${machine.name}`}
          >
            <span className="material-symbols-outlined text-[18px]">
              delete
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
}