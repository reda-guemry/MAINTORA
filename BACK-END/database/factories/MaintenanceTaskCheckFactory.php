<?php

namespace Database\Factories;

use App\Models\ChecklistItem;
use App\Models\MaintenanceTask;
use App\Models\MaintenanceTaskCheck;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<MaintenanceTaskCheck>
 */
class MaintenanceTaskCheckFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'maintenance_task_id' => MaintenanceTask::factory(),
            'checklist_item_id' => ChecklistItem::factory(),
            'status' => fake()->optional()->boolean(),
            'comment' => fake()->optional()->sentence(),
        ];
    }
}
