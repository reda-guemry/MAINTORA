<?php

namespace App\Repositories\CheckList;

use App\Models\ChecklistTemplate;
use App\Models\User;

class ChecklistTemplateRepository
{
    public function paginateChecklistTemplates($perPage = 10)
    {
        return ChecklistTemplate::where('created_by', auth('api')->id())->paginate($perPage);
    }

    public function create(array $data, User $user)
    {
        return $user->checklistTemplates()->create($data);
    }

    public function find($id)
    {
        return ChecklistTemplate::where('created_by', auth('api')->id())->findOrFail($id);
    }

    public function update($id, array $data)
    {
        $checklistTemplate = $this->find($id);
        $checklistTemplate->update($data);

        return $checklistTemplate;
    }

    public function delete($id)
    {
        $checklistTemplate = $this->find($id);

        return $checklistTemplate->delete();
    }
}
