
import { ApiError, type ApiErrorResponse, type ApiRequestOptions } from '../types/api.types'

function resolveApiBaseUrl(rawBaseUrl: string): string {
    if (/^https?:\/\/backend:8000\/?$/i.test(rawBaseUrl)) {
        return '/api'
    }

    return rawBaseUrl.replace(/\/$/, '')
}

function joinApiUrl(baseUrl: string, endpoint: string): string {
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`

    if (!baseUrl) {
        return normalizedEndpoint
    }

    return `${baseUrl}${normalizedEndpoint}`
}

const API_BASE_URL = resolveApiBaseUrl(import.meta.env.VITE_API_URL || '')

function isFormData(value: unknown): value is FormData {
    return typeof FormData !== "undefined" && value instanceof FormData;
}

function buildHeaders(
    headers: Record<string, string> = {},
    body?: unknown
): Record<string, string> {
    return {
        ...(!body || isFormData(body) ? {} : { "Content-Type": "application/json" }),
        ...headers,
        "Accept": "application/json",
    };
}

async function parseResponse(response: Response): Promise<unknown> {
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
        return response.json();
    }

    return null;
}


export async function api<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
): Promise<T> {

    const {
        method = "GET",
        body,
        headers = {
        },
        signal,
    } = options;


    const response = await fetch(joinApiUrl(API_BASE_URL, endpoint), {
        method,
        credentials: 'include',
        headers: buildHeaders(headers, body),
        body: !body ? undefined : isFormData(body) ? body : JSON.stringify(body),
        signal,
    })

    const responseData = await parseResponse(response);

    if (!response.ok) {
        const errorResponse = responseData as ApiErrorResponse;
        throw new ApiError(
            errorResponse.message || "An error occurred",
            response.status,
            responseData,
            errorResponse.errors
        );
    }

    return responseData as T;
    
}

