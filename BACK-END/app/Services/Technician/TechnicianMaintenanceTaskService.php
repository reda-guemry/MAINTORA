<?php

namespace App\Services\Technician;

use App\Models\MaintenanceTask;
use App\Repositories\Technician\TechnicianMaintenanceTaskRepository;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TechnicianMaintenanceTaskService
{
    public function __construct(
        private TechnicianMaintenanceTaskRepository $technicianMaintenanceTaskRepository,
    ) {}

    public function getPaginate(array $filters = [], int $perPage = 10)
    {
        return $this->technicianMaintenanceTaskRepository->paginateAssignedTasks($filters, $perPage);
    }

    public function findAssignedTask(int $taskId)
    {
        $task = $this->technicianMaintenanceTaskRepository->findAssignedTask($taskId);

        if($task->assignedTo() !== auth('api')->user()) {
            throw new Exception('Unauthorized access to this maintenance task.' , 403);
        }

        return $task;
    }

    public function updateAssignedTask(int $taskId, array $data)
    {
        $task = $this->findAssignedTask($taskId);

        $task = $this->technicianMaintenanceTaskRepository->update($task, [
            'status' => $data['status'],
            'completed_at' => $data['status'] === 'completed'
                ? now()->toDateString()
                : null,
        ]);

        return $this->findAssignedTask($task->id);
    }


    public function getAssignedMachines()
    {
        return $this->technicianMaintenanceTaskRepository->getAssignedMachines();
    }

    
}
