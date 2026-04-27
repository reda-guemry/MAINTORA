<?php

namespace App\Repositories\Client;

use App\Models\RepairRequest;

class ClientRepairRequestRepository
{
    public function paginate(array $filters = [], int $perPage = 10)
    {
        return $this->query()
            ->with(
                'machine.creator',
                'anomaly.machine',
                'anomaly.reportedBy.roles',
                'requestedBy.roles',
                'assignedTo.roles',
                'purchaseOrder.uploader.roles',
            )
            ->when($filters['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate($perPage);
    }

    public function find(int $repairRequestId)
    {
        return $this->query()
            ->with(
                'machine.creator',
                'anomaly.machine',
                'anomaly.reportedBy.roles',
                'requestedBy.roles',
                'assignedTo.roles',
                'purchaseOrder.uploader.roles',
            )
            ->findOrFail($repairRequestId);
    }

    private function query()
    {
        return RepairRequest::whereHas('machine', function ($machineQuery) {
            $machineQuery->where('created_by', auth('api')->id());
        });
    }

}
