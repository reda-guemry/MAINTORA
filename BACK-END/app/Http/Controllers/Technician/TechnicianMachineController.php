<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Http\Resources\MachineResource;
use App\Services\Rounde\MaintenanceTaskService;
use App\Services\Technician\TechnicianMaintenanceTaskService;

class TechnicianMachineController extends Controller
{
    public function __construct(
        private MaintenanceTaskService $maintenanceTaskService,
    ) {}

    public function index()
    {
        $machines = $this->maintenanceTaskService->getAssignedMachines();

        return response()->json([
            'success' => true,
            'message' => 'Assigned machines retrieved successfully',
            'data' => MachineResource::collection($machines),
        ]);
    }
}
