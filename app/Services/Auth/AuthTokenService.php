<?php

namespace App\Services\Auth;

use App\Repositories\Auth\RefreshTokenRepository;

class AuthTokenService
{
    public function __construct(
        private RefreshTokenRepository $refreshTokenRepository,
    ){}

    public function issueToken($user)
    {
        $refreshToken = $this->generateRefreshToken();

        $refresh = $this->refreshTokenRepository->create($user->id, $refreshToken['refresh_token_hash']);

        return [
            'refresh_token' => $refreshToken['refresh_token'],
            'expires_in' => $refresh->expires_at->diffInMinutes(now()),
        ] ;
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
