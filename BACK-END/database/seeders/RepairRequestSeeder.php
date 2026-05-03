<?php

namespace Database\Seeders;

use App\Models\Anomaly;
use App\Models\Machine;
use App\Models\RepairRequest;
use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Seed repair requests for anomalies.
 *
 * Creates repair requests linked to detected anomalies.
 * Each anomaly gets 1-3 repair requests with various statuses.
 */
class RepairRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $anomalies = Anomaly::all();
        $clients = User::role('client')->get();
        $technicians = User::role('technician')->get();

        if ($anomalies->isEmpty() || $clients->isEmpty()) {
            $this->command->warn('Required data not found. Please run dependent seeders first.');
            return;
        }

        $requestCount = 0;

        foreach ($anomalies as $anomaly) {
            // Each anomaly generates 1-3 repair requests
            $requestsPerAnomaly = rand(1, 3);

            for ($i = 0; $i < $requestsPerAnomaly; $i++) {
                RepairRequest::create([
                    'machine_id' => $anomaly->machine_id,
                    'anomaly_id' => $anomaly->id,
                    'requested_by' => $clients->firstWhere('id', $anomaly->machine->created_by)->id ?? $clients->random()->id,
                    'assigned_to' => $technicians->random()?->id,
                    'title' => $this->generateRepairTitle(),
                    'description' => $this->generateRepairDescription(),
                    'status' => $this->randomRequestStatus(),
                    'estimated_cost' => rand(100, 5000),
                ]);
                $requestCount++;
            }
        }

        $this->command->info("Created {$requestCount} repair requests");
    }

    /**
     * Generate repair request title.
     */
    private function generateRepairTitle(): string
    {
        $titles = [
            'Urgent repair needed',
            'Preventive maintenance required',
            'Component replacement',
            'System diagnosis and repair',
            'Emergency service call',
            'Scheduled repair',
            'Warranty service',
            'Retrofit upgrade',
        ];

        return $titles[array_rand($titles)];
    }

    /**
     * Generate repair request description.
     */
    private function generateRepairDescription(): string
    {
        $descriptions = [
            'Service technician required for on-site inspection',
            'Replace worn components and test system',
            'Perform diagnostics and implement repairs',
            'Emergency response needed within 24 hours',
            'Routine maintenance and calibration',
            'Non-critical but recommended service',
            'Extended warranty coverage applies',
            'Parts availability to be confirmed',
        ];

        return $descriptions[array_rand($descriptions)];
    }

    /**
     * Generate random request status.
     */
    private function randomRequestStatus(): string
    {
        $statuses = ['open', 'open', 'open', 'in_progress', 'completed', 'rejected'];
        return $statuses[array_rand($statuses)];
    }
}
