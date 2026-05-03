<?php

namespace Database\Seeders;

use App\Models\Anomaly;
use App\Models\Machine;
use App\Models\MaintenanceTask;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;


class AnomalySeeder extends Seeder
{
    public function run(): void
    {
        $machines = Machine::all();
        $tasks = MaintenanceTask::all();
        $technicians = User::role('technician')->get();

        if ($machines->isEmpty() || $technicians->isEmpty()) {
            $this->command->warn('Required data not found. Please run dependent seeders first.');
            return;
        }

        $anomalyCount = 0;

        foreach ($machines as $machine) {
            $anomaliesPerMachine = rand(0, 3);

            for ($i = 0; $i < $anomaliesPerMachine; $i++) {
                Anomaly::create([
                    'machine_id' => $machine->id,
                    'reported_by' => $technicians->random()->id,
                    'maintenance_task_id' => $tasks->random()?->id,
                    'title' => $this->generateAnomalyTitle(),
                    'description' => $this->generateAnomalyDescription(),
                    'severity' => $this->randomSeverity(),
                    'status' => $this->randomAnomalyStatus(),
                ]);
                $anomalyCount++;
            }
        }

        $this->command->info("Created {$anomalyCount} anomalies");
    }
    private function generateAnomalyTitle(): string
    {
        $titles = [
            'Unusual vibration detected',
            'Pressure deviation',
            'Temperature fluctuation',
            'Leak detected',
            'Bearing wear',
            'Seal degradation',
            'Electrical issue',
            'Performance degradation',
            'Noise level abnormal',
            'Control system error',
        ];

        return $titles[array_rand($titles)];
    }


    private function generateAnomalyDescription(): string
    {
        $descriptions = [
            'Detected during routine inspection',
            'Reported by technician during maintenance',
            'Automatic sensor detection',
            'Observed during operation',
            'Identified in diagnostic test',
            'Noticed during shift handover',
            'Confirmed by multiple tests',
            'Intermittent issue detected',
        ];

        return $descriptions[array_rand($descriptions)];
    }


    private function randomSeverity(): string
    {
        $severity = ['low', 'medium', 'high'];
        return $severity[array_rand($severity)];
    }

    private function randomAnomalyStatus(): string
    {
        $statuses = ['open', 'in_progress', 'resolved' , 'rejected' ];
        return $statuses[array_rand($statuses)];
    }
}
