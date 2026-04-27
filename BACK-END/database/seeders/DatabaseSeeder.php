<?php

namespace Database\Seeders;

use App\Models\Anomaly;
use App\Models\ChecklistItem;
use App\Models\ChecklistTemplate;
use App\Models\ChecklistTemplateItem;
use App\Models\Machine;
use App\Models\MaintenancePlan;
use App\Models\MaintenanceTask;
use App\Models\MaintenanceTaskCheck;
use App\Models\RepairPurchaseOrder;
use App\Models\RepairRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class,
        ]);

        Model::unguarded(function () {
            $users = User::factory(12)->create();
            $machines = Machine::factory(10)->make()->map(function ($machine) use ($users) {
                $machine->created_by = $users->random()->id;
                $machine->save();

                return $machine;
            });

            $checklistItems = ChecklistItem::factory(18)->create();
            $templates = ChecklistTemplate::factory(8)->make()->map(function ($template) use ($users) {
                $template->created_by = $users->random()->id;
                $template->save();

                return $template;
            });

            $templates->each(function ($template) use ($checklistItems) {
                $selectedItems = $checklistItems->random(rand(3, 6))->values();

                $selectedItems->each(function ($item, $index) use ($template) {
                    ChecklistTemplateItem::factory()->create([
                        'checklist_template_id' => $template->id,
                        'checklist_item_id' => $item->id,
                        'order' => $index + 1,
                    ]);
                });
            });

            $plans = collect();

            for ($i = 0; $i < 12; $i++) {
                $plans->push(MaintenancePlan::factory()->create([
                    'machine_id' => $machines->random()->id,
                    'checklist_template_id' => $templates->random()->id,
                    'assigned_to' => $users->random()->id,
                    'created_by' => $users->random()->id,
                ]));
            }

            $tasks = collect();

            for ($i = 0; $i < 20; $i++) {
                $plan = $plans->random();

                $tasks->push(MaintenanceTask::factory()->create([
                    'machine_id' => $plan->machine_id,
                    'maintenance_plan_id' => $plan->id,
                ]));
            }

            $tasks->each(function ($task) use ($templates) {
                $template = $templates->firstWhere('id', $task->maintenancePlan->checklist_template_id);

                if (!$template) {
                    return;
                }

                $template->loadMissing('checklistItems');

                foreach ($template->checklistItems as $templateItem) {
                    MaintenanceTaskCheck::factory()->create([
                        'maintenance_task_id' => $task->id,
                        'checklist_item_id' => $templateItem->checklist_item_id,
                    ]);
                }
            });

            $anomalies = collect();

            for ($i = 0; $i < 12; $i++) {
                $task = $tasks->random();

                $anomalies->push(Anomaly::factory()->create([
                    'machine_id' => $task->machine_id,
                    'maintenance_task_id' => $task->id,
                    'reported_by' => $users->random()->id,
                ]));
            }

            $repairRequests = collect();

            foreach ($anomalies as $anomaly) {
                $repairRequests->push(RepairRequest::factory()->create([
                    'machine_id' => $anomaly->machine_id,
                    'requested_by' => $users->random()->id,
                    'anomaly_id' => $anomaly->id,
                    'assigned_to' => rand(0, 1) ? $users->random()->id : null,
                ]));
            }

            $repairRequests->each(function ($repairRequest) use ($users) {
                RepairPurchaseOrder::factory(rand(0, 2))->create([
                    'repair_request_id' => $repairRequest->id,
                    'uploaded_by' => $users->random()->id,
                ]);
            });
        });

    }
}
