<?php

namespace App\Repositories\Anomaly;

use App\Models\Anomaly;
use App\Models\RepairRequest;

class RepairRequestRepository
{
    public function createForAnomaly(Anomaly $anomaly, array $data , int $clientId )
    {
        $repairRequest = RepairRequest::create([
            'machine_id' => $anomaly->machine_id,
            'requested_by' => auth('api')->id(),
            'anomaly_id' => $anomaly->id,
            'assigned_to' => $clientId ,
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

    }
