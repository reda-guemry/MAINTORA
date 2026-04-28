<?php

namespace App\Http\Helpers;

use Illuminate\Http\JsonResponse;

class ApiResponse
{
    
    public static function success(
        mixed $data = null,
        string $message = 'Operation successful',
        int $statusCode = 200
    ): JsonResponse {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }


    public static function error(
        string $message = 'An error occurred',
        int $statusCode = 400,
        ?array $errors = null
    ): JsonResponse {
        return response()->json([
            'success' => false,
            'message' => $message,
            'data' => null,
            'errors' => $errors,
        ], $statusCode);
    }
}
