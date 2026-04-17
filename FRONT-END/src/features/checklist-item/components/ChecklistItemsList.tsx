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
    <div className="overflow-hidden rounded-3xl border border-[#e8e0d4] bg-white shadow-[0_18px_45px_rgba(62,52,39,0.08)]">
      <div className="divide-y divide-[#f0ebe2]">
        {isLoading && (
          <div className="px-6 py-10 text-center text-[#7f7468]">
            Loading checklist items...
          </div>
        )}

        {!isLoading && error && (
          <div className="px-6 py-10 text-center text-red-500">{error}</div>
        )}

        {!isLoading && !error && items.length === 0 && (
          <div className="px-6 py-10 text-center text-[#7f7468]">
            No checklist items found.
          </div>
        )}

        {!isLoading &&
          !error &&
          items.map((item) => {
            const isEditing = editingItemId === item.id;

            return (
              <div
                key={item.id}
                className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex min-w-0 items-start gap-4">
                  <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-[#d6cec1] bg-[#f7f3ec] text-[12px] font-black text-[#816b55]">
                    {item.id}
                  </div>

                  <div className="min-w-0 flex-1">
                    {isEditing ? (
                      <Input
                        value={editingValue}
                        onChange={(event) => onEditChange(event.target.value)}
                        className="max-w-xl border-[#ddd5c8] bg-[#fcfaf7]"
                        autoFocus
                      />
                    ) : (
                      <p className="text-sm font-semibold leading-7 text-[#32281f]">
                        {item.label}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 md:justify-end">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={onEditCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => onEditSubmit(item.id)}
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditStart(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(item)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {children}
    </div>
  );
}
