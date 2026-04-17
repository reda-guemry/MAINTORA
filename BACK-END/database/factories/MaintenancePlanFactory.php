<?php

namespace Database\Factories;

use App\Models\ChecklistTemplate;
use App\Models\Machine;
use App\Models\MaintenancePlan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<MaintenancePlan>
 */
class MaintenancePlanFactory extends Factory
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
            'checklist_template_id' => ChecklistTemplate::factory(),
            'assigned_to' => User::factory(),
            'repeat_every' => fake()->numberBetween(1, 6),
            'repeat_unit' => fake()->randomElement(['day', 'week', 'month']),
            'start_date' => fake()->date(),
            'status' => fake()->randomElement(['active', 'inactive']),
            'created_by' => User::factory(),
        ];
    }
}
