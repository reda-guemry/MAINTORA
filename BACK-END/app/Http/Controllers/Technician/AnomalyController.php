<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnomalyRequest;
use App\Http\Resources\AnomalyResource;
use App\Services\Technician\TechnicianAnomalyService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class AnomalyController extends Controller
{
    public function __construct(
        private TechnicianAnomalyService $technicianAnomalyService,
    ) {}

    public function index(Request $request)
    {
        $data = $this->technicianAnomalyService->getPaginate(
            $request->only(['status', 'severity']),
            (int) $request->query('per_page', 10),
        );

        $data->through(function ($anomaly) {
            return new AnomalyResource($anomaly);
        });

        return response()->json([
            'success' => true,
            'message' => 'Anomalies retrieved successfully',
            'data' => $data,
        ]);
    }

    public function store(StoreAnomalyRequest $request, int $taskId)
    {
        try {
            $anomaly = $this->technicianAnomalyService->createForTask(
                $taskId,
                $request->validated(),
            );

            return response()->json([
                'success' => true,
                'message' => 'Anomaly created successfully',
                'data' => new AnomalyResource($anomaly),
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Maintenance task not found.',
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while creating anomaly.',
                'error' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }
}
