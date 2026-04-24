<?php

namespace App\Http\Controllers\Anomaly;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnomalyRequest;
use App\Http\Requests\StoreRepairRequestRequest;
use App\Http\Resources\AnomalyResource;
use App\Http\Resources\RepairRequestResource;
use App\Services\Anomaly\AnomalyService;
use App\Services\ChefTechnician\ChefTechnicianAnomalyService;
use App\Services\ChefTechnician\ChefTechnicianRepairRequestService;
use App\Services\Technician\TechnicianAnomalyService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class RepairRequestController extends Controller
{
    public function __construct(
        private AnomalyService $anomalyService,
    ) {}

    
     public function store(StoreRepairRequestRequest $request, int $id)
    {
        try {
            $repairRequest = $this->anomalyService->createForAnomaly(
                $id,
                $request->validated(),
            );

            return response()->json([
                'success' => true,
                'message' => 'Repair request created successfully',
                'data' => new RepairRequestResource($repairRequest),
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Anomaly not found.',
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while creating repair request.',
                'error' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }
    
}
