<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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

        return response()->json([
            'success' => true,
            'message' => 'Users retrieved successfully',
            'data' => $data,
        ]);

    }

    public function store(StoreUserRequest $request)
    {
        try {
            $user = $this->userService->create($request->validated());
            return response()->json([
                'success' => true,
                'message' => 'User created successfully',
                'data' => new UserResource($user),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while creating user.',
                'error' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }

    public function show(int $id)
    {
        try {
            $user = $this->userService->findOrFail($id);
            return response()->json([
                'success' => true,
                'message' => 'User retrieved successfully',
                'data' => new UserResource($user),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'User not found.',
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while retrieving user.',
                'error' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }

    public function update(UpdateUserRequest $request, int $id)
    {
        try {
            $user = $this->userService->update($id, $request->validated());

            return response()->json([
                'success' => true,
                'message' => 'User updated successfully',
                'data' => $user,
            ]);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'User not found.',
            ], 404);
        }

    }

    public function destroy(int $id)
    {
        try {
            $this->userService->delete($id);

            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully',
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'User not found.',
            ], 404);
        }
    }

}
