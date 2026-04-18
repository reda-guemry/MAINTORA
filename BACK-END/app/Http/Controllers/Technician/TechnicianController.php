<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Services\User\UserService;
use Illuminate\Http\Request;

class TechnicianController extends Controller
{
    

    public function __construct(
        private UserService $userService , 
    ){}

    public function getAll()
    {
        $technicians = $this->userService->gettechnicians() ;
        return response()->json([
            'success' => true,
            'message' => 'Technicians retrieved successfully',
            'data' => $technicians
        ]);
    }
}
