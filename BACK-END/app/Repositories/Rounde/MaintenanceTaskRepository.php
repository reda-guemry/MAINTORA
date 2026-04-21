<?php

namespace App\Services\Rounde;

use App\Models\MaintenancePlan;


class MaintenanceTaskRepository
{

    
    public function __construct(){}


    public function genericNextTask (MaintenancePlan $plan , string $nextDate , $machinId ) { 
        return $plan->maintenanceTasks()->create([
            'scheduled_at' => $nextDate,
            'status' => 'pending',
            'machine_id' => $machinId
        ]) ;

    }


}
