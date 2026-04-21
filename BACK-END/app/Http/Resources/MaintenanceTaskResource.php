<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MaintenanceTaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'scheduled_at' => $this->scheduled_at,
            'status' => $this->status,
            'completed_at' => $this->completed_at,
            'anomalies_count' => $this->whenCounted('anomalies'),
            'machine' => MachineResource::make($this->whenLoaded('machine')),
            'assigned_to' => UserResource::make($this->whenLoaded('assignedTo')),
            'maintenance_plan' => $this->whenLoaded('maintenancePlan', function () {
                return [
                    'id' => $this->maintenancePlan?->id,
                    'repeat_every' => $this->maintenancePlan?->repeat_every,
                    'repeat_unit' => $this->maintenancePlan?->repeat_unit,
                    'start_date' => $this->maintenancePlan?->start_date,
                    'status' => $this->maintenancePlan?->status,
                ];
            }),
            'checklist_template' => $this->when(
                $this->relationLoaded('maintenancePlan')
                    && $this->maintenancePlan?->relationLoaded('checklistTemplate'),
                function () {
                    return ChecklistTemplateResource::make($this->maintenancePlan?->checklistTemplate);
                },
            ),
            'check_items' => $this->when(
                $this->relationLoaded('maintenancePlan')
                    && $this->maintenancePlan?->relationLoaded('checklistTemplate')
                    && $this->maintenancePlan->checklistTemplate?->relationLoaded('checklistItems')
                    && $this->relationLoaded('checkItems'),
                function () {
                    return $this->transformCheckItems();
                },
            ),
            'anomalies' => AnomalyResource::collection($this->whenLoaded('anomalies')),
        ];
    }

    private function transformCheckItems(): array
    {
        $checksByChecklistItem = $this->checkItems->keyBy('checklist_item_id');

        return $this->maintenancePlan->checklistTemplate->checklistItems
            ->sortBy(function ($item) {
                return $item->pivot?->order ?? PHP_INT_MAX;
            })
            ->values()
            ->map(function ($item) use ($checksByChecklistItem) {
                $check = $checksByChecklistItem->get($item->id);

                return [
                    'id' => $check?->id,
                    'checklist_item_id' => $item->id,
                    'label' => $item->label,
                    'order' => $item->pivot?->order,
                    'status' => $check?->status,
                    'comment' => $check?->comment,
                ];
            })
            ->all();
    }
}
