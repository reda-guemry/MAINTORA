<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubmitMaintenanceTaskRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'checks' => ['required', 'array', 'min:1'],
            'checks.*.checklist_item_id' => ['required', 'integer', 'exists:checklist_items,id'],
            'checks.*.status' => ['required', 'boolean'],
            'checks.*.comment' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
