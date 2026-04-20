<?php

namespace App\Repositories\CheckList;

use App\Models\ChecklistTemplate;
use App\Models\User;

class ChecklistTemplateRepository
{
    public function paginateChecklistTemplates($perPage = 10)
    {
        return ChecklistTemplate::where('created_by', auth('api')->id())->with('checklistItems')->paginate($perPage);
    }

    public function create(array $data, User $user)
    {
        return $user->checklistTemplates()->create($data);
    }

    public function find($id)
    {
        return ChecklistTemplate::with('checklistItems')->findOrFail($id);
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

    public function search(string $query)
    {
        return ChecklistTemplate::where('created_by', auth('api')->id())
            ->where('name', 'like', "%$query%")
            ->limit(7)
            ->get() ; 
    }

}
