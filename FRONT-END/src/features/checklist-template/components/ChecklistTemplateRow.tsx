import type { ChecklistTemplateRowProps } from "../types/checklistTemplateComponents";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ChecklistTemplateRow({
  template,
  onEdit,
  onDelete,
}: ChecklistTemplateRowProps) {
  const initials = template.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();

  return (
    <tr className="group transition-colors hover:bg-[#fbf8f2]">
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#efe7da] text-sm font-black text-[#816b55]">
            {initials}
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#2d241c]">
              {template.name}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#9d9388]">
              Template #{template.id}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-5 text-sm leading-6 text-[#6f6254]">
        {template.description || "No description provided."}
      </td>
      <td className="px-6 py-5 text-sm font-medium text-[#6f6254]">
        {formatDate(template.updated_at)}
      </td>
      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(template)}
            className="rounded-full bg-[#f3eee7] p-2 text-[#6f6254] transition-colors hover:bg-[#dff1ef] hover:text-[#4b9c99]"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button
            type="button"
            onClick={() => onDelete(template)}
            className="rounded-full bg-[#f3eee7] p-2 text-[#6f6254] transition-colors hover:bg-red-50 hover:text-red-500"
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
