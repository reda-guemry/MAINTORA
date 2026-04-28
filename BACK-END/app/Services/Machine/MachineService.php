<?php

namespace App\Services\Machine;

use App\Repositories\Machine\MachineRepository;

class MachineService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private MachineRepository $machineRepository,
    ){}


    public function getPaginate()
    {
        return $this->machineRepository->getPaginate();
    }

    public function create($data)
    {
        $user = auth('api')->user();

        return $this->machineRepository->create($data , $user);
    }

    public function findOrFail($id)
    {
        return $this->machineRepository->find($id);
    }

    public function update($id, $data)
    {
        return $this->machineRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->machineRepository->delete($id);
    }

    public function getAll()
    {
        return $this->machineRepository->All();
    }

    public function getMine()
    {
        return $this->machineRepository->getAllForCurrentClient();
    }


    public function isUnderPlanMaintenance($machineId)
    {
        $machine = $this->machineRepository->find($machineId);
        return $machine->haveActiveMaintenancePlan();
    }


}
