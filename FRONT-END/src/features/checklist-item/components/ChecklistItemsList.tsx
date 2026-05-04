import { Button, Input } from "@/shared/components/ui";
import type { ChecklistItemsListProps } from "../types/checklistItemComponents";

export function ChecklistItemsList({
  items,
  isLoading,
  error,
  editingItemId,
  editingValue,
  onEditStart,
  onEditCancel,
  onEditChange,
  onEditSubmit,
  onDelete,
  children,
}: ChecklistItemsListProps) {
  return (
    <div className="flex flex-col">
      <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white">
        
        {isLoading && (
          <div className="px-6 py-10 text-center text-[14px] text-gray-500">
            Loading checklist items...
          </div>
        )}

        {!isLoading && error && (
          <div className="px-6 py-10 text-center text-[14px] text-red-500">
            {error}
          </div>
        )}

        {!isLoading && !error && items.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <span className="material-symbols-outlined mb-2 text-[40px] text-gray-300">
              inventory_2
            </span>
            <p className="text-[14px] font-medium text-gray-500">No checklist items found.</p>
          </div>
        )}

        {!isLoading &&
          !error &&
          items.map((item) => {
            const isEditing = editingItemId === item.id;

            return (
              <div
                key={item.id}
                className="flex flex-col gap-4 p-4 transition-colors hover:bg-gray-50/50 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-[12px] font-bold text-gray-500">
                    {item.id}
                  </div>

                  <div className="min-w-0 flex-1">
                    {isEditing ? (
                      <Input
                        value={editingValue}
                        onChange={(event) => onEditChange(event.target.value)}
                        className="w-full max-w-xl border-gray-200 bg-white text-[13px] text-[#111827] focus:border-[#388E8E] focus:ring-1 focus:ring-[#388E8E]"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") onEditSubmit(item.id);
                          if (e.key === "Escape") onEditCancel();
                        }}
                      />
                    ) : (
                      <p className="truncate text-[14px] font-medium text-[#1A1A1A]">
                        {item.label}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 gap-2 md:justify-end">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={onEditCancel}
                        className="flex h-8 items-center gap-1.5 px-3 text-[13px]"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => onEditSubmit(item.id)}
                        className="flex h-8 items-center gap-1.5 bg-[#388E8E] px-3 text-[13px] text-white hover:bg-[#2c7a7a]"
                      >
                        <span className="material-symbols-outlined text-[16px]">check</span>
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditStart(item)}
                        className="flex h-8 items-center gap-1.5 px-3 text-[13px] text-gray-600 hover:text-[#388E8E]"
                      >
                        <div className="flex gap-2 items-center">
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                          <span>Edit</span>
                        </div>
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(item)}
                        className="flex h-8 items-center gap-1.5 px-3 text-[13px]"
                      >
                        <div className="flex gap-2 items-center">

                        <span className="material-symbols-outlined text-[16px]">delete</span>
                        <span>Delete</span>
                        </div>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {children && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  );
}