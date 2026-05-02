import type { UserTableRowProps } from "../types/usersComponents";
import { cn } from "@/shared/utils";

const roleBadgeClasses: Record<string, string> = {
  admin: "bg-red-50 text-red-700",
  "chef technician": "bg-indigo-50 text-indigo-700",
  chef_technician: "bg-indigo-50 text-indigo-700",
  technician: "bg-[#eef7f6] text-[#388E8E]",
  client: "bg-amber-50 text-amber-700",
};

export function UserTableRow({ user, onEdit, onDelete }: UserTableRowProps) {
  const initials = `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}`.toUpperCase();
  const primaryRole = user.roles?.[0]?.name ?? "No role";
  const roleLabel = primaryRole.replaceAll("_", " ");

  return (
    <tr className="transition-colors hover:bg-gray-50/70">
      <td className="px-6 py-4 text-[13px] font-medium text-gray-400">#{user.id}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf3f3] text-sm font-bold text-primary">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-bold text-gray-800">
              {user.first_name} {user.last_name}
            </p>
            <p className="truncate text-[12px] text-gray-500">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold capitalize",
            roleBadgeClasses[primaryRole] ?? "bg-gray-100 text-gray-600",
          )}
        >
          {roleLabel}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-[13px] font-semibold text-gray-700">Active</span>
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(user)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-colors hover:border-[#388E8E]/30 hover:bg-[#eef7f6] hover:text-[#388E8E]"
            type="button"
            aria-label={`Edit ${user.first_name} ${user.last_name}`}
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button
            onClick={() => onDelete(user)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            type="button"
            aria-label={`Delete ${user.first_name} ${user.last_name}`}
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
}
