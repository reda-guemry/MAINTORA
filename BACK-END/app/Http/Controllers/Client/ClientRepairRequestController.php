<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiResponse;
use App\Http\Resources\RepairRequestResource;
use App\Services\Client\ClientRepairRequestService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ClientRepairRequestController extends Controller
{
    public function __construct(
        private ClientRepairRequestService $clientRepairRequestService,
    ) {}

    public function index(Request $request)
    {
        $data = $this->clientRepairRequestService->paginate(
            $request->only(['status']),
            $request->query('per_page', 10),
        );

        $data->through(function ($repairRequest) {
            return new RepairRequestResource($repairRequest);
        });

        return ApiResponse::success($data, 'Repair requests retrieved successfully');
    }

    public function show(int $id)
    {
        try {
            $repairRequest = $this->clientRepairRequestService->findOrFail($id);
            return ApiResponse::success(new RepairRequestResource($repairRequest), 'Repair request retrieved successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Repair request not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while retrieving repair request', $e->getCode() ?: 500);
        }
    }

    
}
