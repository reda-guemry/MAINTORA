<?php

namespace App\Repositories\RepairRequest;

use App\Models\Anomaly;
use App\Models\RepairPurchaseOrder;
use App\Models\RepairRequest;

class RepairPurchaseOrderRepository
{
    public function findClientOwnedRepairRequest(int $repairRequestId)
    {
        return RepairRequest::whereHas('machine', function ($machineQuery) {
            $machineQuery->where('created_by', auth('api')->id());
        })
            ->with($this->relations())
            ->findOrFail($repairRequestId);
    }

    public function findRepairRequestForReview(int $repairRequestId)
    {
        return RepairRequest::with($this->relations())
            ->findOrFail($repairRequestId);
    }

    public function createPurchaseOrder(RepairRequest $repairRequest, array $data)
    {
        $purchaseOrder = RepairPurchaseOrder::create([
            'repair_request_id' => $repairRequest->id,
            'uploaded_by' => auth('api')->id(),
            'file_path' => $data['file_path'],
            'original_file_name' => $data['original_file_name'],
            'status' => 'uploaded',
        ]);

        return $purchaseOrder->load('uploader.roles');
    }

   

    public function countOpenAnomaliesForMachine(int $machineId, int $exceptAnomalyId): int
    {
        return Anomaly::where('machine_id', $machineId)
            ->where('id', '!=', $exceptAnomalyId)
            ->whereIn('status', ['pending', 'open', 'in_progress'])
            ->count();
    }

    public function relations(): array
    {
        return [
            'machine.creator',
            'anomaly.machine',
            'anomaly.reportedBy.roles',
            'requestedBy.roles',
            'assignedTo.roles',
            'purchaseOrder.uploader.roles',
        ];
    }
}
