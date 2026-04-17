<?php

namespace App\Repositories\CheckList;

use App\Models\ChecklistItem;
use App\Models\ChecklistTemplate;
use App\Models\User;

class ChecklistItemsRepository
{
    public function paginateChecklistTemplates($perPage = 10)
    {
        return ChecklistItem::paginate($perPage);
    }

    public function create(array $data)
    {
        return ChecklistItem::create($data);
    }

    public function find($id)
    {
        return ChecklistItem::findOrFail($id);
    }

    public function update($id, array $data)
    {
        $checklistItem = $this->find($id);
        $checklistItem->update($data);

        return $checklistItem;
    }

    public function delete($id)
    {
        $checklistItem = $this->find($id);

        return $checklistItem->delete();
    }
}
