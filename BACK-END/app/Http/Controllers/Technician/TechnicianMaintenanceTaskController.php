<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Http\Requests\TechnicianMaintenanceTaskIndexRequest;
use App\Http\Requests\UpdateTechnicianMaintenanceTaskRequest;
use App\Http\Resources\MaintenanceTaskResource;
use App\Http\Helpers\ApiResponse;
use App\Services\Rounde\MaintenanceTaskService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TechnicianMaintenanceTaskController extends Controller
{
    public function __construct(
        private MaintenanceTaskService $maintenanceTaskService,
    ) {}

    public function index(TechnicianMaintenanceTaskIndexRequest $request)
    {
        $data = $this->maintenanceTaskService->getPaginate(
            $request->only(['status', 'scheduled_date', 'week_start', 'search']),
            $request->query('per_page', 10),
        );
                                    
        $data->through(function ($maintenanceTask) {
            return new MaintenanceTaskResource($maintenanceTask);
        });

        return ApiResponse::success($data, 'Assigned maintenance tasks retrieved successfully');
    }

    public function show(int $id)
    {
        try {
            $task = $this->maintenanceTaskService->findAssignedTask($id);

            return ApiResponse::success(new MaintenanceTaskResource($task), 'Maintenance task retrieved successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Maintenance task not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while retrieving maintenance task', 500);
        }
    }

    public function update(UpdateTechnicianMaintenanceTaskRequest $request, int $id)
    {
        try {
            $task = $this->maintenanceTaskService->updateAssignedTask(
                $id,
                $request->validated(),
            );

            return ApiResponse::success(new MaintenanceTaskResource($task), 'Maintenance task updated successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Maintenance task not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while updating maintenance task', 500);
        }
    }
}
