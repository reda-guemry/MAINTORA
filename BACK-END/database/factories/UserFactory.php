<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * User factory for generating realistic test users.
 *
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => Hash::make('12345678'),
            'phone' => $this->generatePhoneNumber(),
            'status' => fake()->randomElement(['active', 'active', 'active', 'inactive']),
        ];
    }

    /**
     * Generate a realistic phone number.
     */
    private function generatePhoneNumber(): string
    {
        $areaCode = rand(201, 999);
        $exchange = rand(200, 999);
        $number = rand(1000, 9999);
        return "+1-{$areaCode}-{$exchange}-{$number}";
    }
}

