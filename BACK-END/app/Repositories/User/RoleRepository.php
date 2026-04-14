<?php

namespace App\Repositories\User;

use App\Models\User;
use Spatie\Permission\Models\Role;

class RoleRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct(

    ){}

    public function assigned($user,int $roleId): User
    {
        $role = Role::findById($roleId);

        return $user->assignRole($role);
    }


}
