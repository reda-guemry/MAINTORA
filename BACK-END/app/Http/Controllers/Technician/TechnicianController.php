<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Helpers\ApiResponse;
use App\Services\Technician\TechnicianService;
use Illuminate\Http\Request;

class TechnicianController extends Controller
{
    

    public function __construct(
        private TechnicianService $technicianService,
    ){}

    public function getAll()
    {
        $technicians = $this->technicianService->gettechnicians() ;
        return ApiResponse::success(UserResource::collection($technicians), 'Technicians retrieved successfully');
    }


    public function statistics()
    {
        $statistics = $this->technicianService->statistics();
        
        return ApiResponse::success($statistics, 'Technician statistics retrieved successfully');
    }


}
