<?php

namespace Database\Factories;

use App\Models\Anomaly;
use App\Models\Machine;
use App\Models\MaintenanceTask;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Anomaly>
 */
class AnomalyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'machine_id' => Machine::factory(),
            'reported_by' => User::factory(),
            'maintenance_task_id' => MaintenanceTask::factory(),
            'title' => fake()->sentence(4),
            'description' => fake()->sentence(8),
            'severity' => fake()->randomElement(['low', 'medium', 'high']),
            'status' => fake()->randomElement(['open', 'in_progress', 'resolved', 'rejected']),
        ];
    }
}
