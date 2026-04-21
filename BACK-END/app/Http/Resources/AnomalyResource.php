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
        ];
    }
}
