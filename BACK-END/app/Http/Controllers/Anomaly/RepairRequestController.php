<?php

namespace App\Http\Controllers\Anomaly;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiResponse;
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
            return ApiResponse::success(new RepairRequestResource($repairRequest), 'Repair request created successfully', 201);
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Anomaly not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while creating repair request', $e->getCode() ?: 500);
        }
    }
    
}
