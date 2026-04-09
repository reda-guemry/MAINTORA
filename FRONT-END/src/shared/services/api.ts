
import { ApiError, type ApiErrorResponse , type ApiRequestOptions } from '../types/api.types'


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function buildHeaders(
    headers: Record<string, string> = {},
    hasBody: boolean = false
): Record<string, string> {
    return {
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
        ...headers,
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
        headers = {},
        signal,
    } = options;


    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method , 
        credentials : "include" , 
        headers : buildHeaders(headers , !!body) ,
        body : body ? JSON.stringify(body) : undefined ,
        signal , 
    } )

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


