<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'checks' => 'required|array|min:1',
            'checks.*.checklist_item_id' => 'required|integer|exists:checklist_items,id',
            'checks.*.status' => 'required|in:ok,not_ok,anomaly',
            'checks.*.comment' => 'nullable|string|max:1000',
            'checks.*.anomaly' => 'nullable|array',
            'checks.*.anomaly.title' => 'nullable|string|max:255',
            'checks.*.anomaly.description' => 'nullable|string',
            'checks.*.anomaly.severity' => 'nullable|in:low,medium,high',
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            foreach ($this->input('checks', []) as $index => $check) {
                if ($check['status']  !== 'anomaly') {
                    continue;
                }

                $anomaly = $check['anomaly'] ?? [];

                foreach (['title', 'description', 'severity'] as $field) {
                    if (empty($anomaly[$field])) {
                        $validator->errors()->add(
                            "checks.{$index}.anomaly.{$field}",
                            'This field is required when checklist status is anomaly.',
                        );
                    }
                }
            }
        });
    }
}
