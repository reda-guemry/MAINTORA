<?php

namespace Database\Seeders;

use App\Models\MaintenancePlan;
use App\Models\MaintenanceTask;
use App\Models\MaintenanceTaskCheck;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

/**
 * Seed maintenance tasks for maintenance plans.
 *
 * Creates individual maintenance tasks based on active plans.
 * Each active plan generates 3-6 scheduled tasks.
 */
class MaintenanceTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $activePlans = MaintenancePlan::where('status', 'active')->get();
        $technicians = User::role('technician')->get();

        if ($activePlans->isEmpty() || $technicians->isEmpty()) {
            $this->command->warn('No active plans or technicians found.');
            return;
        }

        $taskCount = 0;

        foreach ($activePlans as $plan) {
            // Each plan generates 3-6 tasks
            $tasksPerPlan = rand(3, 6);

            for ($i = 0; $i < $tasksPerPlan; $i++) {
                $scheduledDate = Carbon::now()->addDays(rand(0, 90));

                MaintenanceTask::create([
                    'machine_id' => $plan->machine_id,
                    'maintenance_plan_id' => $plan->id,
                    'scheduled_at' => $scheduledDate,
                    'assigned_to' => $technicians->random()->id,
                    'status' => $this->randomTaskStatus(),
                    'completed_at' => $this->getCompletionDate(),
                ]);
                $taskCount++;
            }
        }

        $this->command->info("Created {$taskCount} maintenance tasks");
    }

    /**
     * Generate random task status.
     */
    private function randomTaskStatus(): string
    {
        $statuses = ['pending', 'pending', 'in_progress', 'completed'];
        return $statuses[array_rand($statuses)];
    }

    /**
     * Get completion date if task is completed, otherwise null.
     */
    private function getCompletionDate(): ?string
    {
        // 40% chance of completed task
        if (rand(1, 100) <= 40) {
            return Carbon::now()->subDays(rand(0, 30))->format('Y-m-d H:i:s');
        }

        return null;
    }
}
