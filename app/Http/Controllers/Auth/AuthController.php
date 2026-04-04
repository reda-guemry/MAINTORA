<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\Auth\AuthService;
use Exception;
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

            $refresh_token = $response['refresh_token'] ;

            unset($response['refresh_token']);

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'data' => $response,
            ])->cookie(
                    'refresh_token', // name
                    $refresh_token, // value
                    $refresh_token['expires_in'] , // expiration in minutes 
                    '/api/refresh', // path
                    null, // domain
                    false, // secure
                    true, // httpOnly
                    false, // raw
                    'Strict' // sameSite
                );


        } catch (Exception $e) {
            return response()->json(['error' => 'Login failed', 'message' => $e->getMessage()], 401);
        }

    }

}
