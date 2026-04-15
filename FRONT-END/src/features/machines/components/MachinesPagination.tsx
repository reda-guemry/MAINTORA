import { Button } from "@/shared/components/ui";
import type { MachinesPaginationProps } from "../types/machineComponents";

export function MachinesPagination({
  from,
  to,
  total,
  isLoading,
  onPrevious,
  onNext,
}: MachinesPaginationProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-gray-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-[11px] font-bold uppercase tracking-tight text-gray-400">
        Showing {from}-{to} of {total} assets
      </span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isLoading}
          onClick={onPrevious}
          className="uppercase tracking-[0.2em]"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={isLoading}
          onClick={onNext}
          className="uppercase tracking-[0.2em]"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
