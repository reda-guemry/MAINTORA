<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\LoginRequest;
use App\Http\Helpers\ApiResponse;
use App\Services\Auth\AuthService;
use App\Services\Auth\AuthTokenService;
use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function __construct(
        private AuthService $authService,
        private AuthTokenService $authTokenService ,

    ) {
    }

    public function login(LoginRequest $request)
    {
        try {
            $response = $this->authService->login($request->validated());

            $refresh_token = $response['refresh_token'];
            $expires_in = $response['expires_in'];

            unset($response['refresh_token']);
            unset($response['expires_in']);

            return ApiResponse::success($response, 'Login successful', 200)->cookie(
                    'refresh_token',
                    $refresh_token,
                    10080,
                    '/api/refresh',
                    null,
                    false,
                    true,
                    false,
                    'Strict'
                );

        } catch (Exception $e) {
            return ApiResponse::error('Invalid credentials', 401);
        }
    }


    public function refresh(Request $request)
    {
        if (!$request->hasCookie('refresh_token')) {
            return ApiResponse::error('Refresh token not found', 401);
        }

        try {
            $response = $this->authService->refresh($request->cookie('refresh_token'));
            
            $refresh_token = $response['refresh_token'];
            $expires_in = $response['expires_in'];
            
            unset($response['refresh_token']);
            unset($response['expires_in']);

            return ApiResponse::success($response, 'Token refreshed successfully', 200)->cookie(
                    'refresh_token',
                    $refresh_token,
                    10080,
                    '/api/refresh',
                    null,
                    false,
                    true,
                    false,
                    'Strict'
                );

        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Invalid refresh token', 401);
        } catch (Exception $e) {
            return ApiResponse::error('Token refresh failed', 401);
        }
    }

    public function logout(Request $request)
    {
        try {
            $this->authTokenService->revokeToken($request->cookie('refresh_token'));

            return ApiResponse::success(null, 'Logout successful', 200)->cookie(
                    'refresh_token',
                    '',
                    -1,
                    '/api/refresh',
                    null,
                    false,
                    true,
                    false,
                    'Strict'
                );

        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Invalid refresh token', 401);
        } catch (Exception $e) {
            return ApiResponse::error('Logout failed', 500);
        }
    }

}
