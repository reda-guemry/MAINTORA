export type AppPaginationProps = {
  currentPage: number;
  from?: number | null;
  isLoading?: boolean;
  label: string;
  lastPage: number;
  onPageChange: (page: number) => void;
  to?: number | null;
  total?: number;
};

export function AppPagination({
  currentPage,
  from = 0,
  isLoading = false,
  label,
  lastPage,
  onPageChange,
  to = 0,
  total = 0,
}: AppPaginationProps) {
  const normalizedLastPage = Math.max(lastPage, 1);
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < normalizedLastPage;

  return (
    <div className="flex flex-col gap-3 border-t border-gray-100 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[13px] text-gray-500">
        Showing{" "}
        <span className="font-bold text-gray-700">{from ?? 0}</span> -{" "}
        <span className="font-bold text-gray-700">{to ?? 0}</span> of{" "}
        <span className="font-bold text-gray-700">{total}</span> {label}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isLoading || !canGoPrevious}
          className="flex h-7 w-7 items-center justify-center rounded border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          type="button"
          aria-label="Previous page"
        >
          <span className="material-symbols-outlined text-[16px]">
            chevron_left
          </span>
        </button>

        <span className="min-w-24 text-center text-[12px] font-bold text-gray-500">
          Page {currentPage} of {normalizedLastPage}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLoading || !canGoNext}
          className="flex h-7 w-7 items-center justify-center rounded border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          type="button"
          aria-label="Next page"
        >
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}
