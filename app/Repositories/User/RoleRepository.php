<?php

namespace App\Repositories\User;

use App\Models\User;

class RoleRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct(

    ){}

    public function assigned($user, $role): User
    {
        return $user->assignRole($role);
    }


}
