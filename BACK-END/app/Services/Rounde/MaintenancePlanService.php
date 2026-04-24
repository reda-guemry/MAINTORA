<?php

namespace App\Services\Rounde;

use App\Repositories\Rounde\MaintenancePlanRepository;
use App\Services\Machine\MachineService;
use App\Services\Machine\StartScheduledMaintenanceService;
use App\Services\User\UserService;
use Carbon\Carbon;
use DB;
use Exception;


class MaintenancePlanService
{
    public function __construct(
        private MaintenancePlanRepository $maintenancePlanRepository,
        private MachineService $machineService,
        private UserService $userService,
        private GeneratePlanningService $generatePlanningService,
        private StartScheduledMaintenanceService $startScheduledMaintenanceService,
    ) {}


    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            $this->ensureMachineHasNoOtherActivePlan($data['machine_id']);
            $this->ensureAssignedUserIsTechnician($data['assigned_to']);

            $data['created_by'] = auth('api')->id();

            $maintenancePlan = $this->maintenancePlanRepository->create($data);

            $this->generatePlanningService->generateRoundsForPlan($maintenancePlan);

            if(Carbon::parse($maintenancePlan->start_date)->isToday()) {
                $this->startScheduledMaintenanceService->startShedulerMaintenanceMachine($maintenancePlan->machine);
            }

            return $maintenancePlan;
        });
    }

    public function findOrFail(int $id)
    {
        return $this->maintenancePlanRepository->find($id);
    }

    public function update(int $id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            $maintenancePlan = $this->maintenancePlanRepository->find($id);
            $machineId = $maintenancePlan->machine_id;

            $status = $data['status'] ?? $maintenancePlan->status;

            if ($status === 'active') {
                $this->ensureMachineHasNoOtherActivePlan($machineId, $maintenancePlan->id);
            }

            if (isset($data['assigned_to'])) {
                $this->ensureAssignedUserIsTechnician($data['assigned_to']);
            }

            $maintenancePlan = $this->maintenancePlanRepository->update($id, $data);

            return $maintenancePlan ->refresh();
            
        });
    }

    public function delete(int $id)
    {
        return $this->maintenancePlanRepository->delete($id);
    }

    private function ensureMachineHasNoOtherActivePlan(int $machineId, ?int $exceptPlanId = null): void
    {
        $hasAnotherActivePlan = $exceptPlanId === null
            ? $this->machineService->isUnderPlanMaintenance($machineId)
            : $this->maintenancePlanRepository->hasActivePlanForMachine($machineId, $exceptPlanId);

        if ($hasAnotherActivePlan) {
            throw new Exception('Machine is already under maintenance plan', 400);
        }
    }

    private function ensureAssignedUserIsTechnician(int $userId): void
    {
        $user = $this->userService->findOrFail($userId);

        if (!$user->hasRole('technician')) {
            throw new Exception('Assigned user must be a technician', 400);
        }
    }

}
