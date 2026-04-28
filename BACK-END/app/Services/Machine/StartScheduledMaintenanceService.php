<?php

namespace App\Services\Machine;

use App\Models\Machine;
use App\Repositories\Machine\MachineRepository;

class StartScheduledMaintenanceService
{


    public function __construct(
        private MachineRepository $machineRepository,
    ) {
    }

    public function startScheduledMaintenance()
    {
        $machines = $this->machineRepository->getMachinesWithScheduledMaintenance();

        foreach ($machines as $machine) {
            $this->machineRepository->update($machine->id, ['status' => 'maintenance']);
        }
    }

    public function startShedulerMaintenanceMachine(Machine $machine)
    {
        $this->machineRepository->update($machine->id, ['status' => 'maintenance']);
    }


}
