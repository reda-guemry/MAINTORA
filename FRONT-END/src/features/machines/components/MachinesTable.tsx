import type { MachinesTableProps } from "../types/machineComponents";
import { MachineTableRow } from "./MachineTableRow";

export function MachinesTable({
  machines,
  isLoading,
  error,
  onEdit,
  onDelete,
  onHistory,
  children,
}: MachinesTableProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="overflow-x-auto">
        <table className="w-full min-w-200 text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Code
              </th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Machine Name
              </th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Location
              </th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Status
              </th>
              <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {isLoading && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-sm font-medium text-slate-500">
                  Loading machines...
                </td>
              </tr>
            )}

            {!isLoading && error && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-sm font-medium text-red-600">
                  {error}
                </td>
              </tr>
            )}

            {!isLoading && !error && machines.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-sm font-medium text-slate-500">
                  No machines found.
                </td>
              </tr>
            )}

            {!isLoading &&
              !error &&
              machines.map((machine) => (
                <MachineTableRow
                  key={machine.id}
                  machine={machine}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onHistory={onHistory}
                />
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Container */}
      {children}
    </div>
  );
}