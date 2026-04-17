<?php

namespace App\Services\CheckList;

use App\Repositories\CheckList\ChecklistItemsRepository;

class ChecklistItemsService
{
    public function __construct(
        private ChecklistItemsRepository $checklistItemsRepository,
    ) {
    }

    public function getPaginate()
    {
        return $this->checklistItemsRepository->paginateChecklistTemplates();
    }

    public function create(array $data)
    {
        return $this->checklistItemsRepository->create($data);
    }

    public function findOrFail($id)
    {
        return $this->checklistItemsRepository->find($id);
    }

    public function update($id, array $data)
    {
        return $this->checklistItemsRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->checklistItemsRepository->delete($id);
    }
}
