<?php

namespace App\Services\Auth;

use App\Repositories\User\UserRepository;
use Exception;
use Illuminate\Support\Facades\Hash;

class ProfileService
{
    public function __construct(
        private UserRepository $userRepository,
    ) {}

    public function currentUser()
    {
        return auth('api')->user()->load('roles');
    }

    public function updateProfile(array $data)
    {
        $user = $this->userRepository->updateProfile(auth('api')->id(), $data);

        return $user->load('roles');
    }

    public function updatePassword(array $data)
    {
        $user = auth('api')->user();

        if (! Hash::check($data['current_password'], $user->password)) {
            throw new Exception('Current password is incorrect.', 422);
        }

        $this->userRepository->updatePassword($user->id, $data['new_password']);
    }
}
