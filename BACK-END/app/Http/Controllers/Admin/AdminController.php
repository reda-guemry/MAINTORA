<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiResponse;
use App\Services\Admin\AdminService;
use Exception;

class AdminController extends Controller
{
    public function __construct(
        private AdminService $adminDashboardService,
    ) {}

    public function index()
    {
        try {
            return ApiResponse::success(
                $this->adminDashboardService->dashboard(),
                'Admin dashboard retrieved successfully'
            );
        } catch (Exception $e) {
            return ApiResponse::error($e->getMessage(), $e->getCode() ?: 500);
        }
    }
}
