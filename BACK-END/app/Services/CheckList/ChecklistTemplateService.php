<?php

namespace App\Services\CheckList;

use App\Repositories\CheckList\ChecklistTemplateRepository;

class ChecklistTemplateService
{
    public function __construct(
        private ChecklistTemplateRepository $checklistTemplateRepository,
    ) {
    }

    public function getPaginate()
    {
        return $this->checklistTemplateRepository->paginateChecklistTemplates();
    }

    public function create(array $data)
    {
        $user = auth('api')->user();

        return $this->checklistTemplateRepository->create($data, $user);
    }

    public function findOrFail($id)
    {
        return $this->checklistTemplateRepository->find($id);
    }

    public function update($id, array $data)
    {
        return $this->checklistTemplateRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->checklistTemplateRepository->delete($id);
    }
}
