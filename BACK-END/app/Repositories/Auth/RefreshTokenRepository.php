<?php   

namespace App\Repositories\Auth;

use App\Models\RefreshToken;


class RefreshTokenRepository
{
    public function __construct()
    {
        
    }

    public function create($userId, $tokenHash , $expiresAt = null)
    {
        $expiresAt = $expiresAt ?? now()->addDays(7) ;

        return RefreshToken::create([
            'user_id' => $userId,
            'token_hash' => $tokenHash,
            'expires_at' => $expiresAt,
        ]);
    }

    public function findByToken($token)
    {
        return RefreshToken::where('token_hash', hash('sha256', $token))->firstOrFail() ; 
    }

    public function revokeCurrentToken($tokenHash)
    {
        $token = RefreshToken::where('token_hash', hash('sha256', $tokenHash))->first();
        if ($token) {
            $token->revoke();
        }   
    }

    public function revokeAllForUser($userId)
    {
        RefreshToken::where('user_id', $userId)->revoke();
    }


}