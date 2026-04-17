<?php

namespace Database\Factories;

use App\Models\ChecklistItem;
use App\Models\ChecklistTemplate;
use App\Models\ChecklistTemplateItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ChecklistTemplateItem>
 */
class ChecklistTemplateItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'checklist_template_id' => ChecklistTemplate::factory(),
            'checklist_item_id' => ChecklistItem::factory(),
            'order' => fake()->numberBetween(1, 10),
        ];
    }
}
