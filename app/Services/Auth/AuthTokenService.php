<?php

namespace App\Services\Auth;

use App\Repositories\Auth\RefreshTokenRepository;

class AuthTokenService
{
    public function __construct(
        private RefreshTokenRepository $refreshTokenRepo,
    ){}

    public function issueToken($user)
    {
        $refreshToken = $this->generateRefreshToken();

        $this->refreshTokenRepo->create($user->id, $refreshToken['refresh_token_hash']);

        return $refreshToken['refresh_token'] ;

    }

    private function generateRefreshToken()
    {
        $tokenString = bin2hex(random_bytes(64));

        $tokenHash = hash('sha256', $tokenString);

        return [
            'refresh_token' => $tokenString,
            'refresh_token_hash' => $tokenHash,
        ] ; 
    }

}
