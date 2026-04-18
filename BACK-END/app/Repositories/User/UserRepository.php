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

    public function paginateUsers($perPage = 10)
    {
        return User::with(['roles'])->paginate($perPage);
    }


    public function find($id)
    {
        return User::with(['roles'])->findOrFail($id);
    }

    public function update($id, $data)
    {
        $user = User::findOrFail($id);
        $user->update($data);
        return $user;
    }

    public function delete($id)
    {
        $user = User::findOrFail($id);
        return $user->delete();
    }

    public function getTechnicians()
    {
        return User::role('technician')->get() ;
    }

}
