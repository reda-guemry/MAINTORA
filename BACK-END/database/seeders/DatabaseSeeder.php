<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

/**
 * Main database seeder orchestrator.
 *
 * Coordinates the execution of all seeders in the correct order.
 * Respects foreign key relationships to ensure data integrity.
 *
 * Execution order:
 * 1. RoleSeeder - Creates roles and permissions
 * 2. UserSeeder - Creates users with role assignments
 * 3. MachineSeeder - Creates machines for clients
 * 4. ChecklistTemplateSeeder - Creates checklist templates
 * 5. MaintenancePlanSeeder - Creates maintenance plans
 * 6. MaintenanceTaskSeeder - Creates maintenance tasks
 * 7. AnomalySeeder - Creates anomalies for machines
 * 8. RepairRequestSeeder - Creates repair requests
 * 9. RepairPurchaseOrderSeeder - Creates purchase orders
 */
class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Starting database seeding...');

        // Step 1: Create roles and permissions
        $this->call(RoleSeeder::class);

        // Step 2: Create users with assigned roles
        $this->call(UserSeeder::class);

        // Step 3: Create machines for clients
        $this->call(MachineSeeder::class);

        // Step 4: Create checklist templates and items
        $this->call(ChecklistTemplateSeeder::class);

        // Step 5: Create maintenance plans
        $this->call(MaintenancePlanSeeder::class);

        // Step 6: Create maintenance tasks
        $this->call(MaintenanceTaskSeeder::class);

        // Step 7: Create anomalies
        $this->call(AnomalySeeder::class);

        // Step 8: Create repair requests
        $this->call(RepairRequestSeeder::class);

        // Step 9: Create purchase orders
        $this->call(RepairPurchaseOrderSeeder::class);

        $this->command->info('Database seeding completed successfully!');
        $this->displaySeededData();
    }

    /**
     * Display summary of seeded data.
     */
    private function displaySeededData(): void
    {
        $this->command->newLine();
        $this->command->info('Seeded Data Summary:');
        $this->command->line('--------------------------------------------');

        // Display counts
        $this->command->line('Users: ' . \App\Models\User::count());
        $this->command->line('Machines: ' . \App\Models\Machine::count());
        $this->command->line('Maintenance Plans: ' . \App\Models\MaintenancePlan::count());
        $this->command->line('Maintenance Tasks: ' . \App\Models\MaintenanceTask::count());
        $this->command->line('Anomalies: ' . \App\Models\Anomaly::count());
        $this->command->line('Repair Requests: ' . \App\Models\RepairRequest::count());
        $this->command->line('Purchase Orders: ' . \App\Models\RepairPurchaseOrder::count());
        $this->command->line('Checklist Templates: ' . \App\Models\ChecklistTemplate::count());

        $this->command->newLine();
        $this->command->info('Test Credentials:');
        $this->command->line('Email: admin@example.com');
        $this->command->line('Password: 12345678');
        $this->command->line('--------------------------------------------');
    }
}

