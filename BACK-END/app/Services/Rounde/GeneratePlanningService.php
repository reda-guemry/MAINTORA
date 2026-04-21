<?php

namespace App\Services\Rounde;

use App\Models\MaintenancePlan;

use App\Repositories\Rounde\MaintenancePlanRepository;
use App\Repositories\Rounde\MaintenanceTaskRepository;
use Carbon\Carbon;


class GeneratePlanningService
{
    public function __construct(
        private MaintenanceTaskRepository $maintenanceTaskRepository , 
        private MaintenancePlanRepository $maintenancePlanRepository,
    ) {}

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

        $existisTasks = $plan->maintenanceTasks()
            ->where('scheduled_at', '>', now())
            ->where('status', 'pending')
            ->get();

        $neededDates = [];
        $nextDate = Carbon::parse($plan->start_date);

        $lastDone = $plan->maintenanceTasks()
            ->where('status', '!=', 'pending')
            ->where('scheduled_at', '<', now())
            ->orderBy('scheduled_at', 'desc')
            ->first();

        if ($lastDone) {
            $nextDate = Carbon::parse($lastDone->scheduled_at)->addDays($plan->frequency);
        }

        while ($nextDate->lte($windowEnd)) {
            if ($nextDate->gte(today())) {
                $neededDates[] = $nextDate->toDateString();
            }
            $nextDate->add($plan->repeat_every, $plan->repeat_unit);
        }

        foreach ($existisTasks as $task) {
            if (!in_array($task->scheduled_at, $neededDates)) {
                $task->delete();
            }
        }

        foreach ($neededDates as $date) {
            $this->maintenanceTaskRepository->createOrUpate(
                [
                    'maintenance_plan_id' => $plan->id,
                    'scheduled_at' => $date,
                    'status' => 'pending'
                ],
                [
                    // 'assigned_to' => $plan->assigned_to,
                    'machine_id' => $plan->machine_id,
                ]
            );
        }


    }




}
