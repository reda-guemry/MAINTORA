<?php

namespace App\Services\Auth;

use App\Repositories\Auth\RefreshTokenRepository;
use Exception;

class AuthTokenService
{
    public function __construct(
        private RefreshTokenRepository $refreshTokenRepository,
    ){}

    public function issueToken($user)
    {
        $accessToken = auth()->guard('api')->login($user);
        $refreshToken = $this->generateRefreshToken();

        $refresh = $this->refreshTokenRepository->create($user->id, $refreshToken['refresh_token_hash']);

        return [
            'access_token' => $accessToken,
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

    

    public function refreshToken($token )
    {
        $refreshTokenRecord = $this->refreshTokenRepository->findByToken($token);
        
        if (!$refreshTokenRecord->isUsable()) {

            if (is_null($refreshTokenRecord->revoked_at)) {
                $this->refreshTokenRepository->revokeAllForUser($refreshTokenRecord->user_id);
            }
            throw new Exception('Refresh token is invalid or expired', 401);
        }

        $refreshTokenRecord->update([
            'last_used_at' => now(),
        ]) ; 
        return $this->issueToken($refreshTokenRecord->user);
    }

}
