<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateMaintenancePlanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'checklist_template_id' => 'sometimes|required|exists:checklist_templates,id',
            'assigned_to' => 'sometimes|required|exists:users,id',
            'repeat_every' => 'sometimes|required|integer|min:1',
            'repeat_unit' => 'sometimes|required|string|in:day,week,month',
            'start_date' => 'sometimes|required|date',
            'status' => 'sometimes|required|string|in:active,inactive',
        ];
    }
}
