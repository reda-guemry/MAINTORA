<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreMaintenancePlanRequest extends FormRequest
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
            'machine_id' => 'required|exists:machines,id',
            'checklist_template_id' => 'required|exists:checklist_templates,id',
            'assigned_to' => 'required|exists:users,id',
            'repeat_every' => 'required|integer|min:1',
            'repeat_unit' => 'required|string|in:day,week,month',
            'start_date' => 'required|date',
        ];
    }
}
