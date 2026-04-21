<?php

namespace App\Services\Rounde;

use App\Models\MaintenancePlan;
use App\Repositories\Rounde\MaintenancePlanRepository;


class GeneratePlanningService
{
    public function __construct(
        private MaintenancePlanRepository $maintenancePlanRepository
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
        $windowEnd = now()->addDays(90);


        $plan->maintenanceTasks()
            ->where('scheduled_at', '>', now())
            ->where('status', 'pending')
            ->delete();

        $lastRound = $plan->maintenanceTasks()->orderBy('scheduled_date', 'desc')->first();

        $nextDate = $lastRound ? $lastRound->scheduled_date->addDays($plan->frequency_days) : now();





    }


}
