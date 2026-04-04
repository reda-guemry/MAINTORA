<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;


#[Fillable([
    'token_hash',
    'expires_at',
    'last_used_at',
    'revoked_at'
])]
class RefreshToken extends Model
{
    protected $table = 'refresh_tokens';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isUsable(): bool
    {
        return is_null($this->revoked_at) && $this->expires_at->isFuture();
    }

    public function revoke(): void
    {
        $this->update(['revoked_at' => now()]);
    }


}
