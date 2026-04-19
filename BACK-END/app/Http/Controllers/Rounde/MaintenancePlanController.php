<?php

namespace App\Http\Controllers\Rounde;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMaintenancePlanRequest;
use App\Http\Requests\UpdateMaintenancePlanRequest;
use App\Http\Resources\MaintenancePlanResource;
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

            return response()->json([
                'success' => true,
                'message' => 'Maintenance plan created successfully',
                'data' => MaintenancePlanResource::make($maintenancePlan),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while creating maintenance plan.',
                'error' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }

    public function update(UpdateMaintenancePlanRequest $request, int $id)
    {
        try {
            $maintenancePlan = $this->maintenancePlanService->update($id, $request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Maintenance plan updated successfully',
                'data' => MaintenancePlanResource::make($maintenancePlan),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Maintenance plan not found.',
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while updating maintenance plan.',
                'error' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }

    public function destroy(int $id)
    {
        try {
            $this->maintenancePlanService->delete($id);

            return response()->json([
                'success' => true,
                'message' => 'Maintenance plan deleted successfully',
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Maintenance plan not found.',
            ], 404);
        }
    }



}
