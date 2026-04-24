<?php

namespace App\Services\Machine;

use App\Repositories\Machine\MachineRepositoty;

class StartScheduledMaintenanceService
{
    

    public function __construct(
        private MachineRepositoty $machineRepository,
    ) {}

    public function startScheduledMaintenance()
    {
        $machines = $this->machineRepository->getMachinesWithScheduledMaintenance();

        foreach ($machines as $machine ) {
            $this->machineRepository->update($machine->id, ['status' => 'maintenance']); 
        }
    }


}
