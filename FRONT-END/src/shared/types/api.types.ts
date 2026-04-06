

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



