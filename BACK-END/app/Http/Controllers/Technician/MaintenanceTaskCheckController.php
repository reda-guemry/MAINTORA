<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubmitMaintenanceTaskRequest;
use App\Http\Resources\MaintenanceTaskResource;
use App\Services\Rounde\MaintenanceTaskService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class MaintenanceTaskCheckController extends Controller
{
    public function __construct(
        private MaintenanceTaskService $technicianMaintenanceTaskService,
    ) {}

    public function create(SubmitMaintenanceTaskRequest $request, int $id)
    {
        try {
            $task = $this->technicianMaintenanceTaskService->submitMaintenanceTask(
                $id,
                $request->validated()['checks'],
            );

            return response()->json([
                'success' => true,
                'message' => 'Maintenance task submitted successfully',
                'data' => new MaintenanceTaskResource($task),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Maintenance task not found.',
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while submitting maintenance task.',
                'error' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }

}
