<?php

namespace App\Repositories\Anomaly;

use App\Models\Anomaly;
use App\Models\RepairRequest;

class RepairRequestRepository
{
    public function createForAnomaly(Anomaly $anomaly, array $data, int $clientId)
    {
        $repairRequest = RepairRequest::create([
            'machine_id' => $anomaly->machine_id,
            'requested_by' => auth('api')->id(),
            'anomaly_id' => $anomaly->id,
            'assigned_to' => $clientId,
            'title' => $data['title'],
            'description' => $data['description'],
            'estimated_cost' => $data['estimated_cost'],
            'status' => 'open',
        ]);

        return $repairRequest->load([
            'machine.creator',
            'requestedBy.roles',
            'assignedTo.roles',
        ]);
    }

    public function createReplacementRepairRequest(RepairRequest $repairRequest)
    {
        return RepairRequest::create([
            'machine_id' => $repairRequest->machine_id,
            'reported_by' => $repairRequest->reported_by,
            'maintenance_task_id' => $repairRequest->maintenance_task_id,
            'title' => $repairRequest->title,
            'description' => $repairRequest->description,
            'severity' => $repairRequest->severity,
            'status' => 'open',
        ]);
    }

}
