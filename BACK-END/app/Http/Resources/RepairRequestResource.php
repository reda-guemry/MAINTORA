<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RepairRequestResource extends JsonResource
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
            'status' => $this->status,
            'estimated_cost' => $this->estimated_cost,
            'created_at' => $this->created_at,
            'machine' => MachineResource::make($this->whenLoaded('machine')),
            'anomaly' => AnomalyResource::make($this->whenLoaded('anomaly')),
            'requested_by' => UserResource::make($this->whenLoaded('requestedBy')),
            'assigned_to' => UserResource::make($this->whenLoaded('assignedTo')),
            'purchase_order' => RepairPurchaseResource::make($this->whenLoaded('purchaseOrder')),
        ];
    }
}
