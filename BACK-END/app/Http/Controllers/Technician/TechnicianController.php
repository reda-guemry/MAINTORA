<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Services\Technician\TechnicianService;
use App\Services\User\UserService;
use Illuminate\Http\Request;

class TechnicianController extends Controller
{
    

    public function __construct(
        private TechnicianService $technicianService,
    ){}

    public function getAll()
    {
        $technicians = $this->technicianService->gettechnicians() ;
        return response()->json([
            'success' => true,
            'message' => 'Technicians retrieved successfully',
            'data' => UserResource::collection($technicians),
        ]);
    }


    public function statistics()
    {
        $statistics = $this->technicianService->statistics();
        
        return response()->json([
            'success' => true,
            'message' => 'Technician statistics retrieved successfully',
            'data' => $statistics,
        ]);
    }


}
