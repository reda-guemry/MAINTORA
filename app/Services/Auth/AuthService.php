<?php

namespace App\Services\Auth;

use Auth;
use Exception;

class AuthService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private AuthTokenService $tokenService,
    ){}

    public function login($credentials)
    {
        if(!$token = Auth::guard('api')->attempt($credentials)){
            throw new Exception('Invalid credentials');
        }

        $user = Auth::guard('api')->user();
        
        $pair = $this->tokenService->issueToken($user);


        return $this->tokenService->issueToken($user);
    }


}
