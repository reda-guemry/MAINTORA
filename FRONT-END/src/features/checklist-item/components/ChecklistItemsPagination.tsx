import { Button } from "@/shared/components/ui";
import type { ChecklistItemsPaginationProps } from "../types/checklistItemComponents";

export function ChecklistItemsPagination({
  currentPage,
  lastPage,
  from,
  to,
  total,
  isLoading,
  onPageChange,
}: ChecklistItemsPaginationProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-[#ece6dc] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9d9388]">
        Showing {from ?? 0}-{to ?? 0} of {total} checklist items
      </span>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isLoading || currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="uppercase tracking-[0.2em]"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={isLoading || currentPage >= lastPage}
          onClick={() => onPageChange(currentPage + 1)}
          className="uppercase tracking-[0.2em]"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
