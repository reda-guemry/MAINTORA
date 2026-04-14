import type { UsersTableProps } from "../types/usersComponents";
import { UserTableRow } from "./UserTableRow";



export function UsersTable({ users, isLoading, error, onEdit, onDelete, children }: UsersTableProps ) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-white border-b border-gray-100">
          <tr>
            <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[15%]">User ID</th>
            <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[35%]">Name</th>
            <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[20%]">Role</th>
            <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[15%]">Status</th>
            <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[15%] text-right">Actions</th>
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
              <td colSpan={5} className="py-8 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}

          {!isLoading && !error &&
            users.map((user) => <UserTableRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />)}
        </tbody>
      </table>
      {children}
    </div>
  );
}
