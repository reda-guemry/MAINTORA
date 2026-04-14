<?php

namespace App\Services\Auth;

use App\Http\Resources\UserResource;
use App\Models\User;
use Auth;
use Exception;

class AuthService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private AuthTokenService $tokenService,
    ) {
    }

    public function login($credentials)
    {
        if (!Auth::guard('api')->attempt($credentials)) {
            throw new Exception('Invalid credentials', 401);
        }

        $user = Auth::guard('api')->user()->load('roles');

        $refresh_token = $this->tokenService->issueToken($user);


        return array_merge($refresh_token, [
            'token_type' => 'bearer',
            'expires_in' => Auth::guard('api')->factory()->getTTL(),
            'user' => UserResource::make($user),
        ]);

    }

    public function refresh($refreshToken)
    {
        return $this->tokenService->refreshToken($refreshToken);
    }

}
