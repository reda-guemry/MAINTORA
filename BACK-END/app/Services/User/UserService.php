<?php

namespace App\Services\User;

use App\Repositories\User\UserRepository;
use DB;
use Exception;

class UserService
{
    public function __construct(
        private UserRepository $userRepository,
        private RoleService $roleService,
    ) {
    }


    public function getPaginate()
    {
        return $this->userRepository->paginateUsers();
    }


    public function create($data)
    {


        return DB::transaction(function () use ($data ) {
            if (isset($data['role'])) {
                $role = $data['role'];
                unset($data['role']);
            }

            $user = $this->userRepository->create($data);

            $user = $this -> roleService -> assigned($user , $role);

            return $user ;
        });


    }

    public function findOrFail($id)
    {
        return $this->userRepository->find($id);
    }

    public function update($id, $data)
    {
        return DB::transaction(function () use ($id, $data) {
            
            $user = $this -> userRepository -> update($id, $data);

            if (isset($data['role'])) {
                $role = $data['role'];
                unset($data['role']);
                $user = $this -> roleService -> assigned($user , $role);
            }
            
            return $user;
        });
    }

    public function delete($id)
    {
        return $this -> userRepository -> delete($id);
    }


}
