<?php

namespace App\Http\Controllers\Anomaly;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnomalyRequest;
use App\Http\Resources\AnomalyResource;
use App\Services\Anomaly\AnomalyService;
use App\Services\ChefTechnician\ChefTechnicianAnomalyService;
use App\Services\ChefTechnician\ChefTechnicianRepairRequestService;
use App\Services\Technician\TechnicianAnomalyService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class AnomalyController extends Controller
{
    public function __construct(
        private AnomalyService $anomalyService,
    ) {}

    public function index(Request $request)
    {
        $data = $this->anomalyService->paginate(
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

    public function show(int $id)
    {
        try {
            $anomaly = $this->anomalyService->findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Anomaly retrieved successfully',
                'data' => new AnomalyResource($anomaly),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Anomaly not found.',
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while retrieving anomaly.',
                'error' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }
    
    
}
