<?php   

namespace App\Repositories\Auth;

use App\Models\RefreshToken;


class RefreshTokenRepository
{
    public function __construct()
    {
        
    }

    public function create($userId, $tokenHash , $expiresAt = now()->addDays(15))
    {
        return RefreshToken::create([
            'user_id' => $userId,
            'token_hash' => $tokenHash,
            'expires_at' => $expiresAt,
        ]);
    }

    public function findByTokenHash($token)
    {
        return RefreshToken::where('token_hash', hash('sha256', $token))->first();
    }

    public function invalidate($tokenHash)
    {
        $token = RefreshToken::where('token_hash', $tokenHash)->first();
        if ($token) {
            $token->revoke();
        }   
    }
}