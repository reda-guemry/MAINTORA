<?php

namespace App\Http\Controllers\Anomaly;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiResponse;
use App\Http\Requests\ReviewRepairPurchaseOrderRequest;
use App\Http\Requests\StoreRepairPurchaseOrderRequest;
use App\Http\Resources\RepairRequestResource;
use App\Services\RepairRequest\RepairPurchaseOrderService;
use App\Services\Email\EmailService;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RepairPurchaseOrderController extends Controller
{
    public function __construct(
        private RepairPurchaseOrderService $repairPurchaseOrderService,
        private EmailService $emailService,
    ) {}

    public function review(ReviewRepairPurchaseOrderRequest $request, int $id)
    {
        try {
            $repairRequest = $this->repairPurchaseOrderService->reviewForChefTechnician(
                $id,
                $request->validated()['decision'],
            );
            
            if ($repairRequest->anomaly && $repairRequest->anomaly->machine && $repairRequest->anomaly->machine->created_by) {
                $client = User::find($repairRequest->anomaly->machine->created_by);
                if ($client) {
                    $this->emailService->sendRepairRequestStatusUpdate(
                        repairRequestId: $repairRequest->id,
                        status: $repairRequest->status,
                        notes: 'Purchase order has been reviewed: ' . $request->validated()['decision'],
                        recipientEmail: $client->email
                    );
                }
            }
            
            return ApiResponse::success(new RepairRequestResource($repairRequest), 'Purchase order reviewed successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Repair request not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while reviewing purchase order', $e->getCode() ?: 500);
        }
    }

    public function store(StoreRepairPurchaseOrderRequest $request, int $id)
    {
        try {
            $repairRequest = $this->repairPurchaseOrderService->uploadForClient(
                $id,
                $request->file('purchase_order'),
            );
            return ApiResponse::success(new RepairRequestResource($repairRequest), 'Purchase order uploaded successfully', 201);
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Repair request not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error($e->getMessage() ?? 'Error occurred while uploading purchase order' , $e->getCode() ?: 500);
        }
    }

    
}
