<?php

namespace Database\Factories;

use App\Models\ChecklistTemplate;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ChecklistTemplate>
 */
class ChecklistTemplateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Weekly Safety Inspection',
                'Monthly Vibration Review',
                'Boiler Startup Checklist',
                'Compressor Preventive Routine',
                'Hydraulic Line Validation',
            ]),
            'description' => fake()->optional()->paragraph(),
            'created_by' => User::factory(),
        ];
    }
}
