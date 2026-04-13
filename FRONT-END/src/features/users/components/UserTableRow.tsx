import type { UserTableRowProps } from "../types/usersComponents";


export function UserTableRow({ user, onEdit, onDelete }: UserTableRowProps) {
  const initials = `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}`.toUpperCase();
  const primaryRole = user.roles[0] ?? "No role";

  return (
    <tr className="hover:bg-gray-50/50 transition-colors">
      <td className="py-4 px-6 text-[13px] font-medium text-gray-400">#{user.id}</td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#eaf3f3] text-primabg-primary flex items-center justify-center font-bold text-sm">
            {initials}
          </div>
          <div>
            <p className="text-[14px] font-bold text-gray-800">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-[12px] text-gray-500">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600">
          {primaryRole}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[13px] font-semibold text-gray-700">Active</span>
        </div>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(user)}
            className="p-1.5 text-gray-400 hover:text-primabg-primary transition-colors rounded"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button
            onClick={() => onDelete(user)}
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
}
