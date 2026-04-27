<?php

namespace Database\Factories;

use App\Models\RepairPurchaseOrder;
use App\Models\RepairRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RepairPurchaseOrder>
 */
class RepairPurchaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'repair_request_id' => RepairRequest::factory(),
            'uploaded_by' => User::factory(),
            'file_path' => 'purchase-orders/' . fake()->uuid() . '.pdf',
            'original_file_name' => fake()->slug() . '.pdf',
            'status' => fake()->randomElement(['uploaded', 'approved', 'rejected']),
        ];
    }
}
