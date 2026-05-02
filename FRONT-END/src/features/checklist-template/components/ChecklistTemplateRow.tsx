import type { ChecklistTemplateRowProps } from "../types/checklistTemplateComponents";

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
    <tr className="group transition-colors hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eef7f6] text-[13px] font-bold text-[#388E8E]">
            {initials}
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#1A1A1A] md:text-[14px]">
              {template.name}
            </p>
            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 md:text-[11px]">
              Template #{template.id}
            </p>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4 text-[13px] leading-relaxed text-gray-500 w-1/2 max-w-xs md:max-w-md lg:max-w-lg">
        <div className="line-clamp-2 wrap-break-word" title={template.description ?? undefined}>
          {template.description || "No description provided."}
        </div>
      </td>
      
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onEdit(template)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 transition-colors hover:border-[#388E8E] hover:bg-[#eef7f6] hover:text-[#388E8E]"
            title="Edit template"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
          </button>
          <button
            type="button"
            onClick={() => onDelete(template)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            title="Delete template"
          >
            <span className="material-symbols-outlined text-[16px]">
              delete
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
}