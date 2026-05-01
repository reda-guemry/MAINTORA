<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Http\Requests\TechnicianMaintenanceTaskIndexRequest;
use App\Http\Requests\UpdateTechnicianMaintenanceTaskRequest;
use App\Http\Resources\MaintenanceTaskResource;
use App\Http\Helpers\ApiResponse;
use App\Services\Rounde\MaintenanceTaskService;
use App\Services\Email\EmailService;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TechnicianMaintenanceTaskController extends Controller
{
    public function __construct(
        private MaintenanceTaskService $maintenanceTaskService,
        private EmailService $emailService,
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
            $task = $this->maintenanceTaskService->findAssignedTask($id);
            $oldStatus = $task->status;
            
            $updatedTask = $this->maintenanceTaskService->updateAssignedTask(
                $id,
                $request->validated(),
            );

            // Send notification if status changed
            if ($oldStatus !== $updatedTask->status) {
                $supervisors = User::whereHas('roles', function($q) {
                    $q->whereIn('name', ['admin', 'chef technician']);
                })->where('status', 'active')->pluck('email')->toArray();

                if (!empty($supervisors)) {
                    $this->emailService->sendMaintenanceTaskNotification(
                        taskId: $updatedTask->id,
                        taskName: $updatedTask->name,
                        status: $updatedTask->status,
                        recipients: $supervisors
                    );
                }
            }

            return ApiResponse::success(new MaintenanceTaskResource($updatedTask), 'Maintenance task updated successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Maintenance task not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while updating maintenance task', 500);
        }
    }
}
