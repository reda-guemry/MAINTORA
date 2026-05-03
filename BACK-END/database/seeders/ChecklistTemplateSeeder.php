<?php

namespace Database\Seeders;

use App\Models\ChecklistItem;
use App\Models\ChecklistTemplate;
use App\Models\ChecklistTemplateItem;
use App\Models\User;
use Illuminate\Database\Seeder;



class ChecklistTemplateSeeder extends Seeder
{

    public function run(): void
    {
        $chefTechs = User::role('chef technician')->get();

        if ($chefTechs->isEmpty()) {
            $this->command->warn('No chef technician users found. Please run UserSeeder first.');
            return;
        }

        // Create checklist items first
        $this->createChecklistItems();

        // Create templates and associate items
        $templates = $this->createTemplates($chefTechs);

        $this->command->info("Created " . count($templates) . " checklist templates");
    }


    private function createChecklistItems(): void
    {
        $items = [
            'Check oil level',
            'Check coolant level',
            'Inspect hoses for cracks',
            'Inspect seals and gaskets',
            'Check belt tension',
            'Inspect pulleys for wear',
            'Check electrical connections',
            'Test emergency stop button',
            'Verify all gauges functioning',
            'Clean air filters',
            'Check hydraulic pressure',
            'Inspect pump operation',
            'Verify alignment',
            'Check vibration levels',
            'Inspect wear patterns',
            'Test safety interlocks',
            'Verify lubrication points',
            'Check fasteners tightness',
            'Inspect bearing condition',
            'Test temperature sensors',
        ];

        foreach ($items as $itemLabel) {
            ChecklistItem::firstOrCreate(['label' => $itemLabel]);
        }

        $this->command->line('Checklist items created.');
    }


    private function createTemplates($chefTechs): array
    {
        $templates = [];
        $checklistItems = ChecklistItem::all();

        $templateDefinitions = [
            [
                'name' => 'Daily Inspection Checklist',
                'description' => 'Daily pre-operation inspection for all machines',
                'itemCount' => 5,
            ],
            [
                'name' => 'Weekly Maintenance Checklist',
                'description' => 'Weekly maintenance routine checks',
                'itemCount' => 8,
            ],
            [
                'name' => 'Monthly Deep Maintenance',
                'description' => 'Comprehensive monthly maintenance procedure',
                'itemCount' => 10,
            ],
            [
                'name' => 'Quarterly Overhaul',
                'description' => 'Quarterly in-depth inspection and maintenance',
                'itemCount' => 12,
            ],
            [
                'name' => 'Hydraulic System Check',
                'description' => 'Specialized checklist for hydraulic systems',
                'itemCount' => 6,
            ],
            [
                'name' => 'Electrical System Inspection',
                'description' => 'Electrical components and connections check',
                'itemCount' => 7,
            ],
        ];

        foreach ($templateDefinitions as $def) {
            $template = ChecklistTemplate::create([
                'name' => $def['name'],
                'description' => $def['description'],
                'created_by' => $chefTechs->random()->id,
            ]);

            $randomItems = $checklistItems->random($def['itemCount'])->values();

            foreach ($randomItems as $index => $item) {
                $template->checklistItems()->attach($item->id, [
                    'order' => $index + 1,
                ]);
            }

            $templates[] = $template;
        }

        return $templates;
    }
}
