<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
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

        return response()->json([
            'success' => true,
            'message' => 'Repair requests retrieved successfully',
            'data' => $data,
        ]);
    }

    public function show(int $id)
    {
        try {
            $repairRequest = $this->clientRepairRequestService->findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Repair request retrieved successfully',
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
                'message' => 'Error occurred while retrieving repair request.',
                'error' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }
}
