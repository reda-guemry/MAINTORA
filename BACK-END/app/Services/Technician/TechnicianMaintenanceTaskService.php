<?php

namespace App\Services\Technician;

use App\Repositories\Technician\TechnicianMaintenanceTaskRepository;
use Carbon\Carbon;
use DB;
use Exception;

class TechnicianMaintenanceTaskService
{
    public function __construct(
        private TechnicianMaintenanceTaskRepository $technicianMaintenanceTaskRepository,
    ) {
    }

    public function getPaginate(array $filters = [], int $perPage = 10)
    {
        return $this->technicianMaintenanceTaskRepository->paginateAssignedTasks($filters, $perPage);
    }

    public function findAssignedTask(int $taskId)
    {
        $task = $this->technicianMaintenanceTaskRepository->findAssignedTask($taskId);

        if ((int) $task->assigned_to !== (int) auth('api')->id()) {
            throw new Exception('Unauthorized access to this maintenance task.', 403);
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

    public function submitMaintenanceTask(int $taskId, array $checks)
    {
        return DB::transaction(function () use ($taskId, $checks) {
            $task = $this->findAssignedTask($taskId);
            $hasAnomaly = collect($checks)->contains(function ($check) {
                return $check['status'] === 'anomaly';
            });

            if ($task->machine?->status !== 'maintenance') {
                throw new Exception('Machine is not under maintenance today.', 400);
            }

            if (!Carbon::parse($task->scheduled_at)->isSameDay(now())) {
                throw new Exception('This maintenance task is not scheduled for today.', 400);
            }

            if ($task->status === 'completed') {
                throw new Exception('This maintenance task is already completed.', 400);
            }

            DB::transaction(function () use ($task, $checks, $hasAnomaly) {

                $this->technicianMaintenanceTaskRepository->saveChecks($task, $checks);

                $this->technicianMaintenanceTaskRepository->update($task, [
                    'status' => 'completed',
                    'completed_at' => now()->toDateString(),
                ]);

                $task->machine->update([
                    'status' => $hasAnomaly ? 'anomalous' : 'active',
                ]);

            });

            return $this->findAssignedTask($task->id);
        });
    }


}
