<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatUserRequest;
use App\Services\User\UserService;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    
    public function __construct(
        private UserService $userService,
    ){}

    public function index()
    {
            $users = $this->userService->getPaginate();

            return response()->json([
                'success' => true,
                'message' => 'Users retrieved successfully',
                'data' => $users,
            ]);

        
    }


    public function store(CreatUserRequest $request)
    {
        try{
            $this -> userService -> create($request->validated());
            return response()->json([
                'success' => true,
                'message' => 'User created successfully',
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while creating user.',
                'error' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }

    public function show($id)
    {
        
    }

}
