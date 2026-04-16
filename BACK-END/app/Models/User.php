<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;


#[Fillable([
    'first_name',
    'last_name',
    'email',
    'password',
    'phone',
    'status',
])]

#[Hidden([
    'password',
    'remember_token',
    'deleted_at',
])]

class User extends Authenticatable implements JWTSubject
{

    use HasFactory, Notifiable, HasRoles , SoftDeletes;

    protected $guard_name = 'api';

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'roles' => $this->getRoleNames(),
        ];
    }

    public function machines()
    {
        return $this->hasMany(Machine::class, 'created_by');
    }

    public function checklistTemplates()
    {
        return $this->hasMany(ChecklistTemplate::class, 'created_by');
    }


}
