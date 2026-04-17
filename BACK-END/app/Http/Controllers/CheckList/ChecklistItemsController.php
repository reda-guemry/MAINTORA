<?php

namespace App\Http\Controllers\CheckList;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreChecklistItemRequest;
use App\Http\Requests\StoreChecklistTemplateRequest;
use App\Http\Requests\UpdateChecklistTemplateRequest;
use App\Http\Resources\ChecklistItemResource;
use App\Http\Resources\ChecklistTemplateResource;
use App\Services\CheckList\ChecklistItemsService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ChecklistItemsController extends Controller
{
    public function __construct(
        private ChecklistItemsService $checklistItemsService,
    ) {
    }

    public function index()
    {
        $data = $this->checklistItemsService->getPaginate();

        $data->through(function ($checklistItem) {
            return new ChecklistItemResource($checklistItem);
        });

        return response()->json([
            'success' => true,
            'message' => 'Checklist items retrieved successfully',
            'data' => $data,
        ]);
    }

    public function store(StoreChecklistItemRequest $request)
    {
        try {
            $checklistItem = $this->checklistItemsService->create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Checklist item created successfully',
                'data' => new ChecklistItemResource($checklistItem),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while creating checklist item.',
                'error' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }

    public function show(int $id)
    {
        try {
            $checklistItem = $this->checklistItemsService->findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Checklist item retrieved successfully',
                'data' => new ChecklistItemResource($checklistItem),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Checklist item not found.',
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while retrieving checklist item.',
                'error' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }

    public function update(UpdateChecklistItemRequest $request, int $id)
    {
        try {
            $checklistItem = $this->checklistItemsService->update($id, $request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Checklist item updated successfully',
                'data' => new ChecklistItemResource($checklistItem),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Checklist item not found.',
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while updating checklist item.',
                'error' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }

    public function destroy(int $id)
    {
        try {
            $this->checklistItemsService->delete($id);

            return response()->json([
                'success' => true,
                'message' => 'Checklist item deleted successfully',
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Checklist item not found.',
            ], 404);
        }
    }
}
