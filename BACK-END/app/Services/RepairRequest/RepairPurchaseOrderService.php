<?php

namespace App\Services\RepairRequest;

use App\Repositories\Anomaly\RepairRequestRepository;
use App\Repositories\RepairRequest\RepairPurchaseOrderRepository;
use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class RepairPurchaseOrderService
{
    public function __construct(
        private RepairPurchaseOrderRepository $repairPurchaseOrderRepository,
        private RepairRequestRepository $repairRequestRepository,
    ) {}

    public function uploadForClient(int $repairRequestId, UploadedFile $purchaseOrderFile)
    {
        $storedPath = $purchaseOrderFile->store('repair-purchase-orders', 'public');

        try {
            return DB::transaction(function () use ($repairRequestId, $purchaseOrderFile, $storedPath) {
                $repairRequest = $this->repairPurchaseOrderRepository->findClientOwnedRepairRequest($repairRequestId);

                if ($repairRequest->status !== 'open') {
                    throw new Exception('Purchase order can only be uploaded for open repair requests.', 422);
                }

                if ($repairRequest->purchaseOrder) {
                    throw new Exception('A purchase order has already been uploaded for this repair request.', 422);
                }

                $this->repairPurchaseOrderRepository->createPurchaseOrder($repairRequest, [
                    'file_path' => $storedPath,
                    'original_file_name' => $purchaseOrderFile->getClientOriginalName(),
                ]);

                $repairRequest->update([
                    'status' => 'in_progress',
                ]);

                return $this->repairPurchaseOrderRepository->findClientOwnedRepairRequest($repairRequestId);
            });

        } catch (Exception $exception) {
            Storage::disk('public')->delete($storedPath);
            throw $exception;
        }
    }

    public function reviewForChefTechnician(int $repairRequestId, string $decision)
    {
        return DB::transaction(function () use ($repairRequestId, $decision) {
            $repairRequest = $this->repairPurchaseOrderRepository->findRepairRequestForReview($repairRequestId);

            if (!$repairRequest->purchaseOrder) {
                throw new Exception('No purchase order found for this repair request.', 422);
            }

            if ($repairRequest->purchaseOrder->status !== 'uploaded') {
                throw new Exception('This purchase order has already been reviewed.', 422);
            }

            if ($repairRequest->status !== 'in_progress') {
                throw new Exception('Repair request is not ready for purchase order review.', 422);
            }

            if ($decision === 'approve') {
                $repairRequest->purchaseOrder->update([
                    'status' => 'approved',
                ]);

                $repairRequest->update([
                    'status' => 'completed',
                ]);

                $repairRequest->anomaly->update([
                    'status' => 'resolved',
                ]);

                // $machineStatus = $this->repairPurchaseOrderRepository->countOpenAnomaliesForMachine(
                //     $repairRequest->machine_id,
                //     $repairRequest->anomaly_id,
                // ) > 0
                //     ? 'anomalous'
                //     : 'active';

                // $repairRequest->machine->update([
                //     'status' => $machineStatus,
                // ]);
            }

            if ($decision === 'reject') {
                $repairRequest->purchaseOrder->update([
                    'status' => 'rejected',
                ]);

                // $repairRequest->update([
                //     'status' => 'rejected',
                // ]);

                // $repairRequest->anomaly->update([
                //     'status' => 'rejected',
                // ]);

                $this->repairRequestRepository->createReplacementRepairRequest($repairRequest);



                $repairRequest->machine->update([
                    'status' => 'anomalous',
                ]);
            }

            return $this->repairPurchaseOrderRepository->findRepairRequestForReview($repairRequestId);
        });
    }
}
