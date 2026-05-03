<?php

namespace Database\Seeders;

use App\Models\ChecklistTemplate;
use App\Models\Machine;
use App\Models\MaintenancePlan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;



class MaintenancePlanSeeder extends Seeder
{

    public function run(): void
    {
        $machines = Machine::all();
        $templates = ChecklistTemplate::all();
        $technicians = User::role('technician')->get();
        $chefTechs = User::role('chef technician')->get();

        if ($machines->isEmpty() || $templates->isEmpty() || $technicians->isEmpty()) {
            $this->command->warn('Required data not found. Please run dependent seeders first.');
            return;
        }

        $planCount = 0;

        foreach ($machines as $machine) {
            $plansPerMachine = rand(1, 2);

            for ($i = 0; $i < $plansPerMachine; $i++) {
                MaintenancePlan::create([
                    'machine_id' => $machine->id,
                    'checklist_template_id' => $templates->random()->id,
                    'assigned_to' => $technicians->random()->id,
                    'created_by' => $chefTechs->random()->id,
                    'status' => $this->randomPlanStatus(),
                    'repeat_unit' => $this->randomRepeatUnit(),
                    'repeat_every' => rand(1, 4),
                    'start_date' => Carbon::now()->subDays(rand(0, 30)),
                ]);
                $planCount++;
            }
        }

        $this->command->info("Created {$planCount} maintenance plans");
    }

    private function randomPlanStatus(): string
    {
        $statuses = ['active', 'active', 'active', 'inactive'];
        return $statuses[array_rand($statuses)];
    }

    private function randomRepeatUnit(): string
    {
        $units = ['day', 'week', 'month'];
        return $units[array_rand($units)];
    }
}
