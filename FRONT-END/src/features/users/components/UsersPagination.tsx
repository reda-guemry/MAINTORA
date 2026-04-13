type UsersPaginationProps = {
  currentPage: number;
  lastPage: number;
  from: number | null;
  to: number | null;
  total: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
};

export function UsersPagination({
  currentPage,
  lastPage,
  from,
  to,
  total,
  isLoading,
  onPageChange,
}: UsersPaginationProps) {
  const hasPages = lastPage > 1;

  return (
    <div className="bg-white border-t border-gray-100 px-6 py-4 flex items-center justify-between">
      <p className="text-[13px] text-gray-500">
        Showing <span className="font-bold text-gray-700">{from ?? 0}</span> - <span className="font-bold text-gray-700">{to ?? 0}</span> of{" "}
        <span className="font-bold text-gray-700">{total}</span> users
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isLoading || currentPage <= 1}
          className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
        </button>

        {hasPages && (
          <div className="flex items-center gap-2">
            {Array.from({ length: lastPage }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => onPageChange(i + 1)}
                disabled={isLoading}
                className={`w-7 h-7 flex items-center justify-center rounded ${
                  currentPage === i + 1 ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-50"
                } transition-colors disabled:opacity-40 disabled:cursor-not-allowed`}
                type="button"
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLoading || currentPage >= lastPage}
          className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
