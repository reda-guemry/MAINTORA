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
    <div className="flex flex-col gap-4 bg-white py-2 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[13px] text-gray-500">
        Showing{" "}
        <span className="font-semibold text-[#1A1A1A]">{from ?? 0}</span> -{" "}
        <span className="font-semibold text-[#1A1A1A]">{to ?? 0}</span> of{" "}
        <span className="font-semibold text-[#1A1A1A]">{total}</span> {label}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isLoading || !canGoPrevious}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-[#388E8E] hover:text-[#388E8E] disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300"
          type="button"
          aria-label="Previous page"
        >
          <span className="material-symbols-outlined text-[18px]">
            chevron_left
          </span>
        </button>

        <span className="min-w-20 text-center text-[13px] font-medium text-gray-600">
          Page {currentPage} of {normalizedLastPage}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLoading || !canGoNext}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-[#388E8E] hover:text-[#388E8E] disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300"
          type="button"
          aria-label="Next page"
        >
          <span className="material-symbols-outlined text-[18px]">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}