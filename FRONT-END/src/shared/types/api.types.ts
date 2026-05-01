

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type ApiRequestOptions = {
    method?: HttpMethod;
    body?: unknown ;
    headers?: Record<string, string>;
    retry?: boolean;
    signal?: AbortSignal;
}

export type ApiValidationErrors = Record<string, string[]>;

export type ApiErrorResponse = {
  message: string;
  errors?: ApiValidationErrors;
};



export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, string[]> | null;
};


export type PaginatedResponse<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
  next_page_url: string | null;
  prev_page_url: string | null;
  ge_url: string | null;
};

export class ApiError extends Error {
  status: number;
  errors?: ApiValidationErrors;
  data?: unknown;

  constructor(
    message: string,
    status: number,
    data?: unknown,
    errors?: ApiValidationErrors
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.errors = errors;
  }
}



