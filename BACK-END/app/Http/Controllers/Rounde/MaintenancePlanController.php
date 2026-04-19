<?php

namespace App\Http\Controllers\Rounde;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMaintenancePlanRequest;
use Exception;
use Illuminate\Http\Request;

class MaintenancePlanController extends Controller
{

    public function __construct(

    ){}



    public function store(StoreMaintenancePlanRequest $request)
    {
        try {
            // Logic to create a maintenance plan using the validated request data
            // For example:
            // $maintenancePlan = $this->maintenancePlanService->create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Maintenance plan created successfully',
                // 'data' => new MaintenancePlanResource($maintenancePlan), // Assuming you have a resource for this
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while creating maintenance plan.',
                'error' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }

    public function update( $request, int $id)
    {
        //
    }

    public function destroy(int $id)
    {
        //
    }



}
