<?php

namespace App\Repositories\Technician;

use App\Models\Machine;
use App\Models\MaintenanceTask;

class TechnicianMaintenanceTaskRepository
{
    public function paginateAssignedTasks(array $filters = [], int $perPage = 10)
    {
        return $this->query()
            ->with([
                'machine.creator',
                'maintenancePlan.checklistTemplate',
                'assignedTo.roles',
            ])
            ->withCount('anomalies')
            ->when($filters['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($filters['scheduled_date'] ?? null, function ($query, $scheduledDate) {
                $query->whereDate('scheduled_at', $scheduledDate);
            })
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->whereHas('machine', function ($machineQuery) use ($search) {
                    $machineQuery
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('code', 'like', "%{$search}%")
                        ->orWhere('location', 'like', "%{$search}%");
                });
            })
            ->orderBy('scheduled_at')
            ->paginate($perPage);
    }

    public function findAssignedTask(int $taskId)
    {
        return $this->query()
            ->with([
                'machine.creator',
                'assignedTo.roles',
                'maintenancePlan.assignedTo.roles',
                'maintenancePlan.checklistTemplate.checklistItems',
                'checkItems',
                'anomalies.machine',
                'anomalies.reportedBy.roles',
            ])
            ->withCount('anomalies')
            ->findOrFail($taskId);
    }

    public function update(MaintenanceTask $maintenanceTask, array $data)
    {
        $maintenanceTask->update($data);

        return $maintenanceTask->refresh();
    }

    public function getAssignedMachines()
    {
        return Machine::whereIn(
                'id',
                $this->query()
                    ->select('machine_id')
                    ->distinct()
            )->with('creator')
            ->get();
    }

    private function query()
    {
        return MaintenanceTask::where('assigned_to', auth('api')->id());
    }
}
