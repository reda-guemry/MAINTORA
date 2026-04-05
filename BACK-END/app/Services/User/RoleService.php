<?php

namespace App\Services\User;

use App\Repositories\User\RoleRepository;
use Exception;

class RoleService
{
    public function __construct(
        private RoleRepository $roleRepository ,
    ){}

    public function assigned($user, $role)
    {
        if($role === 'admin') {
            throw new Exception('Cannot assign admin role to a user', 400);
        }

        return $this -> roleRepository -> assigned($user , $role);
    }


}
