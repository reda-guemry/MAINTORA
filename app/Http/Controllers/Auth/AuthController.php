<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\LoginRequest;
use App\Services\Auth\AuthService;
use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function __construct(
        private AuthService $authService,
    ) {
    }

    public function login(LoginRequest $request)
    {

        try {
            $response = $this->authService->login($request->validated());

            $refresh_token = $response['refresh_token'];

            unset($response['refresh_token']);

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'data' => $response,
            ])->cookie(
                    'refresh_token', // name
                    $refresh_token, // value
                    $refresh_token['expires_in'], // expiration in minutes 
                    '/api/refresh', // path
                    null, // domain
                    false, // secure
                    true, // httpOnly
                    false, // raw
                    'Strict' // sameSite
                );


        } catch (Exception $e) {
            return response()->json([
                'error' => 'Login failed',
                'message' => $e->getMessage()
            ], $e->getCode() ?: 401);
        }

    }


    public function refresh(Request $request)
    {
        if (!$request->hasCookie('refresh_token')) {
            return response()->json([
                'error' => 'Refresh token not found'
            ], 401);
        }

        try {
            $response = $this->authService->refresh($request->cookie('refresh_token'));

            return response()->json([
                'success' => true,
                'message' => 'Token refreshed successfully',
                'data' => $response,
            ]);

        }catch(ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Invalid refresh token ',
                'message' => $e->getMessage()
            ], 401);
        }catch (Exception $e) {
            return response()->json([
                'error' => 'Token refresh failed',
                'message' => $e->getMessage()
            ], $e->getCode() ?: 401);
        }

    }


}
