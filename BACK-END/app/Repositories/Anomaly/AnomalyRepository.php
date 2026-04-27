<?php

namespace App\Repositories\Anomaly;

use App\Models\Anomaly;
use App\Models\MaintenanceTask;

class AnomalyRepository
{

    public function createForTask(MaintenanceTask $maintenanceTask, array $data)
    {
        return Anomaly::create([
            ...$data,
            'machine_id' => $maintenanceTask->machine_id,
            'maintenance_task_id' => $maintenanceTask->id,
            'reported_by' => auth('api')->id(),
        ])->load(['machine.creator', 'reportedBy.roles']);
    }



    public function paginate(array $filters = [], int $perPage = 10)
    {
        return Anomaly::with(
                'machine.creator',
                'reportedBy.roles',
                'repairRequest.requestedBy.roles',
                'repairRequest.assignedTo.roles',
                'repairRequest.purchaseOrder.uploader.roles',
                'maintenanceTask.machine',
                'maintenanceTask.maintenancePlan.checklistTemplate',
            )
            ->when($filters['status'] ?? null, function ($query, $status) {
                if ($status === 'pending') {
                    $query->whereIn('status', ['pending', 'open']);

                    return;
                }

                $query->where('status', $status);
            })
            ->when($filters['severity'] ?? null, function ($query, $severity) {
                $query->where('severity', $severity);
            })
            ->latest()
            ->paginate($perPage);
    }

    public function find(int $anomalyId)
    {
        return Anomaly::with(
                'machine.creator',
                'reportedBy.roles',
                'repairRequest.requestedBy.roles',
                'repairRequest.assignedTo.roles',
                'repairRequest.purchaseOrder.uploader.roles',
                'maintenanceTask.machine',
                'maintenanceTask.assignedTo.roles',
                'maintenanceTask.maintenancePlan.checklistTemplate.checklistItems',
                'maintenanceTask.checkItems.checklistItem',
            )
            ->findOrFail($anomalyId);
    }

    public function findForRepairRequest(int $anomalyId)
    {
        return Anomaly::with(['repairRequest'])
            ->findOrFail($anomalyId);
    }


    
}
