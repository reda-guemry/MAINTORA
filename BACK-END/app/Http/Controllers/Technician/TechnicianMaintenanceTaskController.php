<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateTechnicianMaintenanceTaskRequest;
use App\Http\Resources\MaintenanceTaskResource;
use App\Services\Rounde\MaintenanceTaskService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class TechnicianMaintenanceTaskController extends Controller
{
    public function __construct(
        private MaintenanceTaskService $maintenanceTaskService,
    ) {}

    public function index(Request $request)
    {
        $data = $this->maintenanceTaskService->getPaginate(
            $request->only(['status', 'scheduled_date', 'search']),
            $request->query('per_page', 10),
        );
                                    
        $data->through(function ($maintenanceTask) {
            return new MaintenanceTaskResource($maintenanceTask);
        });

        return response()->json([
            'success' => true,
            'message' => 'Assigned maintenance tasks retrieved successfully',
            'data' => $data,
        ]);
    }

    public function show(int $id)
    {
        try {
            $task = $this->maintenanceTaskService->findAssignedTask($id);

            return response()->json([
                'success' => true,
                'message' => 'Maintenance task retrieved successfully',
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
                'message' => 'Error occurred while retrieving maintenance task.',
                'error' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }

    public function update(UpdateTechnicianMaintenanceTaskRequest $request, int $id)
    {
        try {
            $task = $this->maintenanceTaskService->updateAssignedTask(
                $id,
                $request->validated(),
            );

            return response()->json([
                'success' => true,
                'message' => 'Maintenance task updated successfully',
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
                'message' => 'Error occurred while updating maintenance task.',
                'error' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }
}
