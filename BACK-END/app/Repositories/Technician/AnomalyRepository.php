<?php

namespace App\Repositories\Technician;

use App\Models\Anomaly;
use App\Models\MaintenanceTask;

class AnomalyRepository
{
    public function paginateReportedAnomalies(array $filters = [], int $perPage = 10)
    {
        return Anomaly::where('reported_by', auth('api')->id())
            ->with([
                'machine.creator',
                'reportedBy.roles',
                'maintenanceTask.machine',
            ])
            ->when($filters['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($filters['severity'] ?? null, function ($query, $severity) {
                $query->where('severity', $severity);
            })
            ->latest()
            ->paginate($perPage);
    }

    public function createForTask(MaintenanceTask $maintenanceTask, array $data)
    {
        return Anomaly::create([
            ...$data,
            'machine_id' => $maintenanceTask->machine_id,
            'maintenance_task_id' => $maintenanceTask->id,
            'reported_by' => auth('api')->id(),
        ])->load(['machine.creator', 'reportedBy.roles']);
    }
}
