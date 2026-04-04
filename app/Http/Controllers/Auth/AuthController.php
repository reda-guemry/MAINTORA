<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\Auth\AuthService;
use Exception;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function __construct(
        private AuthService $authService,
    ){}

    public function login(LoginRequest $request)
    {
    
        try{
            $response = $this->authService->login($request->validated());

        }catch(Exception $e){
            return response()->json(['error' => 'Login failed', 'message' => $e->getMessage()], 401);
        }

    }
    
}
