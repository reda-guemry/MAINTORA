<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MachineHistoryTaskResource extends JsonResource
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
            'completed_at' => $this->completed_at,
            'status' => $this->status,
            'anomalies_count' => $this->whenCounted('anomalies'),
            'machine' => MachineResource::make($this->whenLoaded('machine')),
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
                $this->relationLoaded('maintenancePlan') && $this->maintenancePlan?->relationLoaded('checklistTemplate'),
                function () {
                    return ChecklistTemplateResource::make($this->maintenancePlan?->checklistTemplate);
                },
            ),
            'check_items' => $this->when(
                $this->relationLoaded('checkItems')
                || (
                    $this->relationLoaded('maintenancePlan')
                    && $this->maintenancePlan?->relationLoaded('checklistTemplate')
                    && $this->maintenancePlan->checklistTemplate?->relationLoaded('checklistItems')
                ),
                function () {
                    return $this->transformCheckItems();
                },
            ),
            'anomalies' => $this->whenLoaded('anomalies', function () {
                return $this->anomalies->map(function ($anomaly) {
                    return [
                        'id' => $anomaly->id,
                        'title' => $anomaly->title,
                        'description' => $anomaly->description,
                        'status' => $anomaly->status,
                        'severity' => $anomaly->severity,
                        'created_at' => $anomaly->created_at,
                        'repair_requests' => $anomaly->relationLoaded('repairRequest')
                            ? $anomaly->repairRequest->map(function ($repairRequest) {
                                return [
                                    'id' => $repairRequest->id,
                                    'title' => $repairRequest->title,
                                    'description' => $repairRequest->description,
                                    'status' => $repairRequest->status,
                                    'estimated_cost' => $repairRequest->estimated_cost,
                                    'created_at' => $repairRequest->created_at,
                                ];
                            })->values()
                            : [],
                    ];
                })->values();
            }),
        ];
    }

    private function transformCheckItems(): array
    {
        $checksByChecklistItem = $this->relationLoaded('checkItems')
            ? $this->checkItems->keyBy('checklist_item_id')
            : collect();

        if (
            $this->relationLoaded('maintenancePlan')
            && $this->maintenancePlan?->relationLoaded('checklistTemplate')
            && $this->maintenancePlan->checklistTemplate?->relationLoaded('checklistItems')
        ) {
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

        return $this->checkItems
            ->map(function ($check) {
                return [
                    'id' => $check->id,
                    'checklist_item_id' => $check->checklist_item_id,
                    'label' => $check->checklistItem?->label,
                    'order' => null,
                    'status' => $check->status,
                    'comment' => $check->comment,
                ];
            })
            ->values()
            ->all();
    }
}
