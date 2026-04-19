<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MaintenancePlanResource extends JsonResource
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
            'assigned_to' => UserResource::make($this->whenLoaded('assignedUser')),
            'checklist_template_id' => ChecklistTemplateResource::make($this->whenLoaded('checklistTemplate')),
            'machine_id' => MachineResource::make($this->whenLoaded('machine')),
            'repeat_every' => $this->repeat_every,
            'repeat_unit' => $this->repeat_unit,
            'start_date' => $this->start_date,
            'status' => $this->status,
        ];
    }
}
