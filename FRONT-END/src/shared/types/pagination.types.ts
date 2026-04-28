
export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    next_page_url: string | null;
    prev_page_url: string | null;
}


export interface PaginatedData<T> extends PaginationMeta {
    data: T[];
}


export interface UsePaginationOptions {

    deps?: unknown[];
}


export interface UsePaginationResult<T> {

    paginate: PaginatedData<T> | null;
    isLoading: boolean;
    currentPage: number;
    error: string | null;
    setPage: (page: number) => void;
    refresh: () => Promise<void>;
    updateItem: <TItem extends { id: number }>(item: TItem) => void;
    removeItem: (id: number) => void;
    addItem: <TItem extends { id: number }>(item: TItem) => void;
}
