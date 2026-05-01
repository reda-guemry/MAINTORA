<?php

namespace App\Repositories\Machine;

use App\Models\MaintenanceTask;

class MachineHistoryRepository
{

    public function technicianCanAccessMachine(int $machineId): bool
    {
        return MaintenanceTask::where('machine_id', $machineId)
            ->where('assigned_to', auth('api')->id())
            ->exists();
    }

    public function paginateTasksForMachine(int $machineId, int $perPage = 10)
    {
        return MaintenanceTask::where('machine_id', $machineId)
            ->withCount('anomalies')
            ->orderByDesc('scheduled_at')
            ->paginate($perPage);
    }

    public function findTaskForMachine(int $machineId, int $taskId)
    {
        return MaintenanceTask::where('machine_id', $machineId)
            ->with([
                'machine.creator',
                'maintenancePlan.checklistTemplate.checklistItems',
                'checkItems.checklistItem',
                'anomalies.repairRequest',
            ])
            ->withCount('anomalies')
            ->findOrFail($taskId);
    }
}
