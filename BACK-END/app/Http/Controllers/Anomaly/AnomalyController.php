<?php

namespace App\Http\Controllers\Anomaly;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiResponse;
use App\Http\Requests\StoreAnomalyRequest;
use App\Http\Resources\AnomalyResource;
use App\Services\Anomaly\AnomalyService;
use App\Services\Email\EmailService;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class AnomalyController extends Controller
{
    
    public function __construct(
        private AnomalyService $anomalyService,
        private EmailService $emailService,
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

        return ApiResponse::success($data, 'Anomalies retrieved successfully');
    }

    public function show(int $id)
    {
        try {
            $anomaly = $this->anomalyService->findOrFail($id);
            
            $user = auth('api')->user();


            
            if (!$user->hasAnyRole(['admin' , 'chef technician']) && $anomaly->machine->created_by !== $user->id) {
                return ApiResponse::error('Unauthorized', 403);
            }
            
            return ApiResponse::success(new AnomalyResource($anomaly), 'Anomaly retrieved successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Anomaly not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while retrieving anomaly', $e->getCode() ?: 500);
        }
    }


    public function store(StoreAnomalyRequest $request, int $taskId)
    {
        try {
            $anomaly = $this->anomalyService->createForTask($taskId, $request->validated());
            
            $recipients = User::whereHas('roles', function($q) {
                $q->whereIn('name', ['admin', 'chef technician']);
            })->where('status', 'active')->pluck('email')->toArray();
            
            if (!empty($recipients)) {
                $this->emailService->sendAnomalyNotification(
                    anomalyId: $anomaly->id,
                    severity: $anomaly->severity,
                    description: $anomaly->description,
                    recipients: $recipients
                );
            }
            
            return ApiResponse::success(new AnomalyResource($anomaly), 'Anomaly created successfully', 201);
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while creating anomaly', $e->getCode() ?: 500);
        }
    }
    
}
