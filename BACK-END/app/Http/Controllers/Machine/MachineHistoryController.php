<?php

namespace App\Http\Controllers\Machine;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiResponse;
use App\Http\Resources\MachineHistoryTaskResource;
use App\Services\Machine\MachineHistoryService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class MachineHistoryController extends Controller
{
    public function __construct(
        private MachineHistoryService $machineHistoryService,
    ) {}

    public function index(Request $request, int $machineId)
    {
        try {
            $data = $this->machineHistoryService->paginate(
                $machineId,
                $request->query('per_page', 10),
            );

            return ApiResponse::success($data, 'Machine maintenance history retrieved successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Machine not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error($e->getMessage(), $e->getCode() ?: 500);
        }
    }

    public function show(int $machineId, int $taskId)
    {
        try {
            $task = $this->machineHistoryService->findTask($machineId, $taskId);

            return ApiResponse::success(
                MachineHistoryTaskResource::make($task),
                'Maintenance task history retrieved successfully'
            );
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Maintenance task not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error($e->getMessage(), $e->getCode() ?: 500);
        }
    }
}
