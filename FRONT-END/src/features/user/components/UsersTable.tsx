import type { UsersTableProps } from "../types/usersComponents";
import { UserTableRow } from "./UserTableRow";
import { Spinner } from "@/shared/components/ui";

export function UsersTable({
  users,
  isLoading,
  error,
  emptyMessage = "No users found.",
  onEdit,
  onDelete,
  children,
}: UsersTableProps ) {
  return (
    <div className="w-full bg-white">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Identity ID</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Full Name</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Access Role</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Account Status</th>
              <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Management</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {isLoading && (
              <tr>
                <td colSpan={5} className="py-24 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Spinner className="text-[#43968C]" size="md" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Synchronizing Registry...</span>
                  </div>
                </td>
              </tr>
            )}

            {!isLoading && error && (
              <tr>
                <td colSpan={5} className="py-20 text-center">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600">
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    {error}
                  </div>
                </td>
              </tr>
            )}

            {!isLoading && !error && users.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-24 text-center">
                  <div className="mx-auto flex max-w-xs flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-slate-50 text-[#43968C]">
                      <span className="material-symbols-outlined text-[32px]">person_search</span>
                    </div>
                    <p className="mt-5 text-sm font-black text-slate-900">
                      {emptyMessage}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-400 leading-relaxed">
                      We couldn't find any accounts matching your current filter criteria.
                    </p>
                  </div>
                </td>
              </tr>
            )}

            {!isLoading && !error &&
              users.map((user) => (
                <UserTableRow
                  key={user.id}
                  user={user}
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