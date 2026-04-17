<?php

namespace Database\Factories;

use App\Models\Machine;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Machine>
 */
class MachineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => strtoupper(fake()->bothify('MCH-####-??')),
            'name' => fake()->randomElement([
                'Hydraulic Press',
                'Packaging Line',
                'Cooling Pump',
                'CNC Lathe',
                'Conveyor Unit',
                'Boiler System',
            ]) . ' ' . fake()->randomDigitNotNull(),
            'location' => fake()->city(),
            'latitude' => fake()->latitude(),
            'longitude' => fake()->longitude(),
            'status' => fake()->randomElement(['active', 'anomalous', 'maintenance']),
            'created_by' => User::factory(),
        ];
    }
}
