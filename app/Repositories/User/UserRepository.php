<?php

namespace App\Repositories\User;

use App\Models\User;

class UserRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct(

    ){}

    public function create($data)
    {
        return User::create($data);
    }

    public function paginateUsers($perPage = 15)
    {
        return User::paginate($perPage);
    }


}
