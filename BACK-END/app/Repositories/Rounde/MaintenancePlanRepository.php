<?php

namespace App\Repositories\Rounde;

use App\Models\MaintenancePlan;

class MaintenancePlanRepository
{
    public function __construct(
    
    ) {}

    public function create(array $data)
    {
        $maintenancePlan = MaintenancePlan::create($data);

        return $this->loadRelations($maintenancePlan);
    }

    public function find(int $id)
    {
        return $this->query()->findOrFail($id);
    }

    public function update(int $id, array $data)
    {
        $maintenancePlan = $this->find($id);
        $maintenancePlan->update($data);

        return $this->loadRelations($maintenancePlan->refresh());
    }

    public function delete(int $id)
    {
        $maintenancePlan = $this->find($id);

        return $maintenancePlan->delete();
    }

    public function hasActivePlanForMachine(int $machineId, ?int $exceptPlanId = null): bool
    {
        return MaintenancePlan::where('machine_id', $machineId)
            ->where('status', 'active')
            ->when($exceptPlanId, function ($query) use ($exceptPlanId) {
                $query->where('id', '!=', $exceptPlanId);
            })
            ->exists();
    }

    private function query()
    {
        return MaintenancePlan::where('created_by', auth('api')->id())
            ->with(['machine.creator', 'checklistTemplate', 'assignedTo.roles']);
    }

    private function loadRelations(MaintenancePlan $maintenancePlan)
    {
        return $maintenancePlan->load(['machine.creator', 'checklistTemplate', 'assignedTo.roles']);
    }

}
