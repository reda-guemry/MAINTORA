<?php

namespace App\Http\Controllers\Rounde;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMaintenancePlanRequest;
use App\Http\Requests\UpdateMaintenancePlanRequest;
use App\Http\Resources\MaintenancePlanResource;
use App\Http\Helpers\ApiResponse;
use App\Services\Rounde\MaintenancePlanService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MaintenancePlanController extends Controller
{

    public function __construct(
        private MaintenancePlanService $maintenancePlanService,
    ){}



    public function store(StoreMaintenancePlanRequest $request)
    {
        try {
            $maintenancePlan = $this->maintenancePlanService->create($request->validated());

            return ApiResponse::success(MaintenancePlanResource::make($maintenancePlan), 'Maintenance plan created successfully', 201);
        } catch (Exception $e) {
            return ApiResponse::error($e->getMessage(), 400);
        }
    }

    public function update(UpdateMaintenancePlanRequest $request, int $id)
    {
        try {
            $maintenancePlan = $this->maintenancePlanService->update($id, $request->validated());

            return ApiResponse::success(MaintenancePlanResource::make($maintenancePlan), 'Maintenance plan updated successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Maintenance plan not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error($e->getMessage(), 400);
        }
    }

    public function destroy(int $id)
    {
        try {
            $this->maintenancePlanService->delete($id);

            return ApiResponse::success(null, 'Maintenance plan deleted successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Maintenance plan not found', 404);
        }
    }



}
