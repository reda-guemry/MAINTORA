<?php

namespace App\Repositories\User;

use App\Models\User;
use Spatie\Permission\Models\Role;

class UserRepository
{
    private const ROLE_ALIASES = [
        'chef_technician' => 'chef technician',
    ];

    public function __construct(

    ){}

    public function create($data)
    {
        return User::create($data);
    }

    public function paginateUsers($perPage = 10, ?string $role = null)
    {
        $query = User::with(['roles']);
        $roleName = $this->resolveRoleName($role);

        if ($roleName) {
            $query->role($roleName);
        }

        return $query->paginate($perPage);
    }

    private function resolveRoleName(?string $role): ?string
    {
        if (!$role) {
            return null;
        }

        if (Role::where('name', $role)->exists()) {
            return $role;
        }

        $alias = self::ROLE_ALIASES[$role] ?? null;

        if ($alias && Role::where('name', $alias)->exists()) {
            return $alias;
        }

        return null;
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

    public function updateProfile($id, $data)
    {
        $user = User::findOrFail($id);
        $user->update($data);
        return $user;
    }

    public function updatePassword($id, string $password)
    {
        $user = User::findOrFail($id);
        $user->update([
            'password' => $password,
        ]);
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
