<?php

namespace App\Http\Controllers\CheckList;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreChecklistTemplateRequest;
use App\Http\Requests\UpdateChecklistTemplateRequest;
use App\Http\Resources\ChecklistTemplateResource;
use App\Services\CheckList\ChecklistTemplateService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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

        return response()->json([
            'success' => true,
            'message' => 'Checklist templates retrieved successfully',
            'data' => $data,
        ]);
    }

    public function store(StoreChecklistTemplateRequest $request)
    {
        try {
            $checklistTemplate = $this->checklistTemplateService->create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Checklist template created successfully',
                'data' => new ChecklistTemplateResource($checklistTemplate),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while creating checklist template.',
                'error' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }

    public function show(int $id)
    {
        try {
            $checklistTemplate = $this->checklistTemplateService->findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Checklist template retrieved successfully',
                'data' => new ChecklistTemplateResource($checklistTemplate),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Checklist template not found.',
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while retrieving checklist template.',
                'error' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }

    public function update(UpdateChecklistTemplateRequest $request, int $id)
    {
        try {
            $checklistTemplate = $this->checklistTemplateService->update($id, $request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Checklist template updated successfully',
                'data' => new ChecklistTemplateResource($checklistTemplate),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Checklist template not found.',
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while updating checklist template.',
                'error' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }

    public function destroy(int $id)
    {
        try {
            $this->checklistTemplateService->delete($id);

            return response()->json([
                'success' => true,
                'message' => 'Checklist template deleted successfully',
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Checklist template not found.',
            ], 404);
        }
    }
}
