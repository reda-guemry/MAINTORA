<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiResponse;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Services\User\UserService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function __construct(
        private UserService $userService,
    ) {
    }

    public function index()
    {
        $data = $this->userService->getPaginate();

        $data->through(function ($user) {
            return new UserResource($user);
        });

        return ApiResponse::success($data, 'Users retrieved successfully');
    }

    public function store(StoreUserRequest $request)
    {
        try {
            $user = $this->userService->create($request->validated());
            return ApiResponse::success(new UserResource($user), 'User created successfully', 201);
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while creating user', $e->getCode() ?: 500);
        }
    }

    public function show(int $id)
    {
        try {
            $user = $this->userService->findOrFail($id);
            return ApiResponse::success(new UserResource($user), 'User retrieved successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('User not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while retrieving user', $e->getCode() ?: 500);
        }
    }

    public function update(UpdateUserRequest $request, int $id)
    {
        try {
            $user = $this->userService->update($id, $request->validated());
            return ApiResponse::success(new UserResource($user), 'User updated successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('User not found', 404);
        }
    }

    public function destroy(int $id)
    {
        try {
            $this->userService->delete($id);
            return ApiResponse::success(null, 'User deleted successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('User not found', 404);
        }
    }
}
