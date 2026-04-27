<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnomalyResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'severity' => $this->severity,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'machine' => MachineResource::make($this->whenLoaded('machine')),
            'reported_by' => UserResource::make($this->whenLoaded('reportedBy')),
            'maintenance_task' => MaintenanceTaskResource::make($this->whenLoaded('maintenanceTask')),
            'repair_request' => RepairRequestResource::collection($this->whenLoaded('repairRequest')),
            'matched_check_items' => $this->when(
                $this->relationLoaded('maintenanceTask')
                    && $this->maintenanceTask?->relationLoaded('checkItems'),
                function () {
                    return $this->maintenanceTask->checkItems
                        ->filter(function ($check) {
                            return $check->status === 'anomaly';
                        })
                        ->values()
                        ->map(function ($check) {
                            return [
                                'id' => $check->id,
                                'checklist_item_id' => $check->checklist_item_id,
                                'label' => $check->checklistItem?->label,
                                'status' => $check->status,
                                'comment' => $check->comment,
                            ];
                        })
                        ->all();
                },
            ),
        ];
    }
}
