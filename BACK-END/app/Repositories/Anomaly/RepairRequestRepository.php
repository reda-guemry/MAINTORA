<?php

namespace App\Repositories\Technician;

use App\Models\Anomaly;
use App\Models\RepairRequest;

class RepairRequestRepository
{
    public function createForAnomaly(Anomaly $anomaly, array $data)
    {
        $repairRequest = RepairRequest::create([
            'machine_id' => $anomaly->machine_id,
            'requested_by' => auth('api')->id(),
            'anomaly_id' => $anomaly->id,
            'assigned_to' => $data['assigned_to'] ?? null,
            'title' => $data['title'],
            'description' => $data['description'],
            'estimated_cost' => $data['estimated_cost'],
            'status' => 'open',
        ]);

        return $repairRequest->load([
            'machine.creator',
            'requester.roles',
            'assignedTo.roles',
        ]);
    }

    }
