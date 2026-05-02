import type { UsersTableProps } from "../types/usersComponents";
import { UserTableRow } from "./UserTableRow";



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
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-left">
        <thead className="border-b border-gray-100 bg-gray-50">
          <tr>
            <th className="w-[14%] px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">User ID</th>
            <th className="w-[36%] px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">Name</th>
            <th className="w-[20%] px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">Role</th>
            <th className="w-[15%] px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">Status</th>
            <th className="w-[15%] px-6 py-4 text-right text-[11px] font-bold uppercase tracking-widest text-gray-400">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {isLoading && (
            <tr>
              <td colSpan={5} className="py-8 text-center text-gray-500">
                Loading users...
              </td>
            </tr>
          )}

          {!isLoading && error && (
            <tr>
              <td colSpan={5} className="py-8 text-center text-red-500">
                {error}
              </td>
            </tr>
          )}

          {!isLoading && !error && users.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center">
                <div className="mx-auto flex max-w-sm flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                    <span className="material-symbols-outlined text-[24px]">group_off</span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-gray-700">
                    {emptyMessage}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Try another role filter or create a new user.
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
      {children}
    </div>
  );
}
