import type { MachinesTableProps } from "../types/machineComponents";
import { MachineTableRow } from "./MachineTableRow";

export function MachinesTable({
  machines,
  isLoading,
  error,
  onEdit,
  onDelete,
  children,
}: MachinesTableProps) {

  console.log({ machines});
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Code
              </th>
              <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Machine Name
              </th>
              <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Location
              </th>
              <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Status
              </th>
              <th className="px-6 py-5 text-right text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {isLoading && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-500">
                  Loading machines...
                </td>
              </tr>
            )}

            {!isLoading && error && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-red-500">
                  {error}
                </td>
              </tr>
            )}

            {!isLoading && !error && machines.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-500">
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
                />
              ))}
          </tbody>
        </table>
      </div>

      {children}
    </div>
  );
}
