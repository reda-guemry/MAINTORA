<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiResponse;
use App\Services\Client\ClientDashboardService;
use Exception;

class ClientDashboardController extends Controller
{
    public function __construct(
        private ClientDashboardService $clientDashboardService,
    ) {}

    public function index()
    {
        try {
            return ApiResponse::success(
                $this->clientDashboardService->dashboard(),
                'Client dashboard retrieved successfully'
            );
        } catch (Exception $e) {
            return ApiResponse::error($e->getMessage() , $e->getCode() ?: 500);
        }
    }
}
