<?php

namespace App\Http\Controllers\CheckList;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiResponse;
use App\Http\Requests\StoreChecklistTemplateRequest;
use App\Http\Requests\UpdateChecklistTemplateRequest;
use App\Http\Resources\ChecklistTemplateResource;
use App\Services\CheckList\ChecklistTemplateService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ChecklistTemplateController extends Controller
{
    public function __construct(
        private ChecklistTemplateService $checklistTemplateService,
    ) {
    }

    public function index()
    {
        $data = $this->checklistTemplateService->getPaginate();

        $data->through(function ($checklistTemplate) {
            return new ChecklistTemplateResource($checklistTemplate);
        });

        return ApiResponse::success($data, 'Checklist templates retrieved successfully');
    }

    public function store(StoreChecklistTemplateRequest $request)
    {
        try {
            $checklistTemplate = $this->checklistTemplateService->create($request->validated());
            return ApiResponse::success(new ChecklistTemplateResource($checklistTemplate), 'Checklist template created successfully', 201);
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while creating checklist template', $e->getCode() ?: 500);
        }
    }

    public function show(int $id)
    {
        try {
            $checklistTemplate = $this->checklistTemplateService->findOrFail($id);
            return ApiResponse::success(new ChecklistTemplateResource($checklistTemplate), 'Checklist template retrieved successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Checklist template not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while retrieving checklist template', $e->getCode() ?: 500);
        }
    }

    public function update(UpdateChecklistTemplateRequest $request, int $id)
    {
        try {
            $checklistTemplate = $this->checklistTemplateService->update($id, $request->validated());
            return ApiResponse::success(new ChecklistTemplateResource($checklistTemplate), 'Checklist template updated successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Checklist template not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while updating checklist template', $e->getCode() ?: 500);
        }
    }

    public function destroy(int $id)
    {
        try {
            $this->checklistTemplateService->delete($id);
            return ApiResponse::success(null, 'Checklist template deleted successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Checklist template not found', 404);
        }
    }

    public function search(Request $request)
    {
        $query = $request->query('search', '');
        $data = $this->checklistTemplateService->search($query);
        return ApiResponse::success(ChecklistTemplateResource::collection($data), 'Checklist templates retrieved successfully');
    }

}
