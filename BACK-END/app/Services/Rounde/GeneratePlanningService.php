<?php

namespace App\Services\Rounde;

use App\Models\MaintenancePlan;
use App\Repositories\Rounde\MaintenancePlanRepository;
use Carbon\Carbon;
use DB;


class GeneratePlanningService
{
    public function __construct(
        private MaintenancePlanRepository $maintenancePlanRepository , 
        private MaintenanceTaskRepository $maintenanceTaskRepository
    ) {
    }

    public function generateRoundsForActivePlans()
    {
        $activePlans = $this->maintenancePlanRepository->getActivePlans();

        foreach ($activePlans as $plan) {
            $this->generateRoundsForPlan($plan);
        }
    }

    public function generateRoundsForPlan(MaintenancePlan $plan)
    {
        $windowEnd = now()->endOfDay()->addDays(90);

        


    }




}
