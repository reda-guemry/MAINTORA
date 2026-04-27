<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class RepairPurchaseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'file_path' => $this->file_path,
            'file_url' => Storage::disk('public')->url($this->file_path),
            'original_file_name' => $this->original_file_name,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'uploaded_by' => UserResource::make($this->whenLoaded('uploader')),
        ];
    }
}
