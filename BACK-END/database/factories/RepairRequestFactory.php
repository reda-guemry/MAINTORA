<?php

namespace Database\Factories;

use App\Models\Anomaly;
use App\Models\Machine;
use App\Models\RepairRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RepairRequest>
 */
class RepairRequestFactory extends Factory
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
            'requested_by' => User::factory(),
            'anomaly_id' => Anomaly::factory(),
            'assigned_to' => fake()->boolean(70) ? User::factory() : null,
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'status' => fake()->randomElement(['open', 'in_progress', 'completed', 'rejected']),
            'estimated_cost' => fake()->randomFloat(2, 150, 9500),
        ];
    }
}
