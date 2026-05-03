<?php

namespace Database\Seeders;

use App\Models\Machine;
use App\Models\User;
use Illuminate\Database\Seeder;




class MachineSeeder extends Seeder
{
    public function run(): void
    {
        $clients = User::role('client')->get();

        if ($clients->isEmpty()) {
            $this->command->warn('No client users found. Please run UserSeeder first.');
            return;
        }

        $machineCount = 0;

        foreach ($clients as $client) {
            $machinesPerClient = rand(2, 4);

            for ($i = 0; $i < $machinesPerClient; $i++) {
                Machine::create([
                    'code' => $this->generateMachineCode(),
                    'name' => $this->generateMachineName(),
                    'location' => $this->generateLocation(),
                    'latitude' => $this->generateLatitude(),
                    'longitude' => $this->generateLongitude(),
                    'status' => $this->randomMachineStatus(),
                    'created_by' => $client->id,
                ]);
                $machineCount++;
            }
        }

        $this->command->info("Created {$machineCount} machines across {$clients->count()} clients");
    }

    private function generateMachineCode(): string
    {
        $prefix = ['MCH', 'MCD', 'AST', 'EQP'];
        $randomPrefix = $prefix[array_rand($prefix)];
        $code = $randomPrefix . '-' . date('Y') . '-' . strtoupper(substr(md5(uniqid()), 0, 4));
        return $code;
    }

    /**
     * Generate a realistic machine name.
     */
    private function generateMachineName(): string
    {
        $machines = [
            'Hydraulic Press',
            'Packaging Line',
            'CNC Lathe',
            'Conveyor Belt System',
            'Industrial Pump',
            'Boiler Unit',
            'Cooling System',
            'Compressor Assembly',
            'Stamping Machine',
            'Welding Robot',
            'Injection Molding Unit',
            'Vertical Milling Machine',
            'Horizontal Boring Machine',
            'Rotary Kiln',
            'Centrifuge',
        ];

        return $machines[array_rand($machines)] . ' #' . rand(1, 99);
    }

    private function generateLocation(): string
    {
        $locations = [
            'Factory A - Hall 1',
            'Factory A - Hall 2',
            'Factory A - Storage',
            'Factory B - Production Line',
            'Factory B - Assembly',
            'Warehouse A - Section 1',
            'Warehouse B - Section 2',
            'Service Center - Area 1',
            'Distribution Center',
            'Field Location',
        ];

        return $locations[array_rand($locations)];
    }

    private function generateLatitude(): float
    {
        return rand(40, 50) + (rand(0, 9999) / 10000);
    }

    private function generateLongitude(): float
    {
        return rand(0, 20) + (rand(0, 9999) / 10000);
    }

    
    private function randomMachineStatus(): string
    {
        $statuses = ['active', 'active', 'active', 'maintenance', 'anomalous'];
        return $statuses[array_rand($statuses)];
    }
}
