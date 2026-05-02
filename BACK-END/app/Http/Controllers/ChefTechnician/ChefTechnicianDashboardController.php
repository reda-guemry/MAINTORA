<?php

namespace App\Http\Controllers\ChefTechnician;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiResponse;
use App\Services\ChefTechnician\ChefTechnicianDashboardService;
use Exception;

class ChefTechnicianDashboardController extends Controller
{
    public function __construct(
        private ChefTechnicianDashboardService $chefTechnicianDashboardService,
    ) {}

    public function statistics()
    {
        try {
            return ApiResponse::success(
                $this->chefTechnicianDashboardService->statistics(),
                'Chef technician dashboard statistics retrieved successfully'
            );
        } catch (Exception $e) {
            return ApiResponse::error($e->getMessage(), $e->getCode() ?: 500);
        }
    }
}
