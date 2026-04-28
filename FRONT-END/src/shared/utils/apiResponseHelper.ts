import type { ApiResponse, PaginatedResponse } from "../types/api.types";


export function unwrapApiResponse<T>(response: ApiResponse<T>): T {
  return response.data;
}


export function extractPaginationData<T>(
  response: ApiResponse<PaginatedResponse<T>>
) {
  const paginationData = response.data;
  return {
    items: paginationData.data,
    currentPage: paginationData.current_page,
    lastPage: paginationData.last_page,
    perPage: paginationData.per_page,
    total: paginationData.total,
    from: paginationData.from,
    to: paginationData.to,
    nextPageUrl: paginationData.next_page_url,
    prevPageUrl: paginationData.prev_page_url,
  };
}


export function hasApiErrors<T>(response: ApiResponse<T>): boolean {
  return !!(response.errors && Object.keys(response.errors).length > 0);
}


export function getApiErrors<T>(response: ApiResponse<T>): string[] {
  if (!response.errors) return [];
  
  return Object.entries(response.errors).flatMap(([field, messages]) => {
    return messages.map(msg => `${field}: ${msg}`);
  });
}
