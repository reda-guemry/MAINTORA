<?php

namespace App\Http\Controllers\Anomaly;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiResponse;
use App\Http\Requests\ReviewRepairPurchaseOrderRequest;
use App\Http\Requests\StoreRepairPurchaseOrderRequest;
use App\Http\Resources\RepairRequestResource;
use App\Services\RepairRequest\RepairPurchaseOrderService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RepairPurchaseOrderController extends Controller
{
    public function __construct(
        private RepairPurchaseOrderService $repairPurchaseOrderService,
    ) {}

    public function review(ReviewRepairPurchaseOrderRequest $request, int $id)
    {
        try {
            $repairRequest = $this->repairPurchaseOrderService->reviewForChefTechnician(
                $id,
                $request->validated()['decision'],
            );
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
            return ApiResponse::error('Error occurred while uploading purchase order', $e->getCode() ?: 500);
        }
    }

    
}
