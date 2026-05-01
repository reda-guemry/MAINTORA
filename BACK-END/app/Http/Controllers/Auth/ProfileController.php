<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiResponse;
use App\Http\Requests\UpdateProfilePasswordRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Services\Auth\ProfileService;
use Exception;

class ProfileController extends Controller
{
    public function __construct(
        private ProfileService $profileService,
    ) {}

    public function show()
    {
        try {
            return ApiResponse::success(
                UserResource::make($this->profileService->currentUser()),
                'Profile retrieved successfully'
            );
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while retrieving profile', $e->getCode() ?: 500);
        }
    }

    public function update(UpdateProfileRequest $request)
    {
        try {
            return ApiResponse::success(
                UserResource::make($this->profileService->updateProfile($request->validated())),
                'Profile updated successfully'
            );
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while updating profile', $e->getCode() ?: 500);
        }
    }

    public function updatePassword(UpdateProfilePasswordRequest $request)
    {
        try {
            $this->profileService->updatePassword($request->validated());

            return ApiResponse::success(null, 'Password updated successfully');
        } catch (Exception $e) {
            return ApiResponse::error($e->getMessage(), $e->getCode() ?: 500);
        }
    }
}
