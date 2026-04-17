<?php

namespace Database\Factories;

use App\Models\Machine;
use App\Models\MaintenancePlan;
use App\Models\MaintenanceTask;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<MaintenanceTask>
 */
class MaintenanceTaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement(['scheduled', 'completed', 'missed']);

        return [
            'machine_id' => Machine::factory(),
            'maintenance_plan_id' => MaintenancePlan::factory(),
            'scheduled_at' => fake()->dateTimeBetween('-2 weeks', '+2 weeks'),
            'status' => $status,
            'completed_at' => $status === 'completed' ? fake()->date() : null,
        ];
    }
}
