<?php

namespace App\Services\CheckList;

use App\Repositories\CheckList\ChecklistTemplateRepository;
use DB;

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
        return DB::transaction(function () use ($id, $data) {
            $checklistTemplate = $this->checklistTemplateRepository->find($id);

            $syncData = [];

            foreach ($data['checklist_items'] as $item) {
                $syncData[$item['id']] = ['order' => $item['order']];
            }

            $checklistTemplate->checklistItems()->sync($syncData);

            $updatedTemplate = $this->checklistTemplateRepository->update($id, $data);

            return $updatedTemplate;
        });
    }

    public function delete($id)
    {
        return $this->checklistTemplateRepository->delete($id);
    }

    public function search(string $query)
    {
        return $this->checklistTemplateRepository->search($query);
    }

}
