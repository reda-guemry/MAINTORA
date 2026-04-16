import type { MachineTableRowProps } from "../types/machineComponents";
import { MachineStatusBadge } from "./MachineStatusBadge";

export function MachineTableRow({
  machine,
  onEdit,
  onDelete,
}: MachineTableRowProps) {
  return (
    <tr className="group transition-colors hover:bg-[#F9FBFB]">
      <td className="px-6 py-5 font-mono text-[11px] text-gray-400">
        #{machine.code}
      </td>
      <td className="px-6 py-5">
        <p className="text-[15px] font-black text-[#1A1A1A]">
          {machine.name}
        </p>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-gray-400">
          Machine #{machine.id}
        </p>
      </td>
      <td className="px-6 py-5">
        <MachineStatusBadge status={machine.status} />
      </td>
      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(machine)}
            className="rounded p-1.5 text-gray-400 transition-colors hover:text-primary"
            aria-label={`Edit ${machine.name}`}
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button
            type="button"
            onClick={() => onDelete(machine)}
            className="rounded p-1.5 text-gray-400 transition-colors hover:text-red-500"
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
