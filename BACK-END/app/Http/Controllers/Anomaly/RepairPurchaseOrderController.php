<?php

namespace App\Http\Controllers\Anomaly;

use App\Http\Controllers\Controller;
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

            return response()->json([
                'success' => true,
                'message' => 'Purchase order reviewed successfully',
                'data' => new RepairRequestResource($repairRequest),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Repair request not found.',
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while reviewing purchase order.',
                'error' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }

    public function store(StoreRepairPurchaseOrderRequest $request, int $id)
    {
        try {
            $repairRequest = $this->repairPurchaseOrderService->uploadForClient(
                $id,
                $request->file('purchase_order'),
            );

            return response()->json([
                'success' => true,
                'message' => 'Purchase order uploaded successfully',
                'data' => new RepairRequestResource($repairRequest),
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Repair request not found.',
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while uploading purchase order.',
                'error' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }

    
}
