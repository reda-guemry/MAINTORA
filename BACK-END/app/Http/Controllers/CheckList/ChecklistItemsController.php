<?php

namespace App\Http\Controllers\CheckList;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiResponse;
use App\Http\Requests\StoreChecklistItemRequest;
use App\Http\Requests\StoreChecklistTemplateRequest;
use App\Http\Requests\UpdateChecklistItemRequest;
use App\Http\Requests\UpdateChecklistTemplateRequest;
use App\Http\Resources\ChecklistItemResource;
use App\Http\Resources\ChecklistItemSearchResource;
use App\Http\Resources\ChecklistTemplateResource;
use App\Services\CheckList\ChecklistItemsService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;


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

        return ApiResponse::success($data, 'Checklist items retrieved successfully');
    }

    public function store(StoreChecklistItemRequest $request)
    {
        try {
            $checklistItem = $this->checklistItemsService->create($request->validated());
            return ApiResponse::success(new ChecklistItemResource($checklistItem), 'Checklist item created successfully', 201);
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while creating checklist item', $e->getCode() ?: 500);
        }
    }

    public function show(int $id)
    {
        try {
            $checklistItem = $this->checklistItemsService->findOrFail($id);
            return ApiResponse::success(new ChecklistItemResource($checklistItem), 'Checklist item retrieved successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Checklist item not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while retrieving checklist item', $e->getCode() ?: 500);
        }
    }

    public function update(UpdateChecklistItemRequest $request, int $id)
    {
        try {
            $checklistItem = $this->checklistItemsService->update($id, $request->validated());
            return ApiResponse::success(new ChecklistItemResource($checklistItem), 'Checklist item updated successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Checklist item not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while updating checklist item', $e->getCode() ?: 500);
        }
    }

    public function destroy(int $id)
    {
        try {
            $this->checklistItemsService->delete($id);
            return ApiResponse::success(null, 'Checklist item deleted successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Checklist item not found', 404);
        }
    }


    public function search(Request $request)
    {
        try {
            $data = $this->checklistItemsService->search($request);
            return ApiResponse::success(ChecklistItemSearchResource::collection($data), 'Checklist items retrieved successfully');
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while searching checklist items', 500);
        }
    }

    public function all()
    {
        try {
            $data = $this->checklistItemsService->all();
            return ApiResponse::success(ChecklistItemResource::collection($data), 'Checklist items retrieved successfully');
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while retrieving checklist items', 500);
        }
    }

}
