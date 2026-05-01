<?php

namespace App\Http\Controllers\Rounde;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMaintenancePlanRequest;
use App\Http\Requests\UpdateMaintenancePlanRequest;
use App\Http\Resources\MaintenancePlanResource;
use App\Http\Helpers\ApiResponse;
use App\Services\Rounde\MaintenancePlanService;
use App\Services\Email\EmailService;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MaintenancePlanController extends Controller
{

    public function __construct(
        private MaintenancePlanService $maintenancePlanService,
        private EmailService $emailService,
    ){}



    public function store(StoreMaintenancePlanRequest $request)
    {
        try {
            $maintenancePlan = $this->maintenancePlanService->create($request->validated());

            // Send notification to technicians
            $technicians = User::whereHas('roles', function($q) {
                $q->whereIn('name', ['technician', 'chef technician']);
            })->where('status', 'active')->pluck('email')->toArray();

            if (!empty($technicians)) {
                $this->emailService->sendCustomEmail(
                    recipients: $technicians,
                    subject: 'New Maintenance Plan Created: ' . $maintenancePlan->name,
                    content: '<h3>New Maintenance Plan Notification</h3><p>A new maintenance plan has been created: <strong>' . $maintenancePlan->name . '</strong></p><p>Please review the plan and start scheduling tasks.</p>'
                );
            }

            return ApiResponse::success(MaintenancePlanResource::make($maintenancePlan), 'Maintenance plan created successfully', 201);
        } catch (Exception $e) {
            return ApiResponse::error($e->getMessage(), 400);
        }
    }

    public function update(UpdateMaintenancePlanRequest $request, int $id)
    {
        try {
            $maintenancePlan = $this->maintenancePlanService->update($id, $request->validated());

            return ApiResponse::success(MaintenancePlanResource::make($maintenancePlan), 'Maintenance plan updated successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Maintenance plan not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error($e->getMessage(), 400);
        }
    }

    public function destroy(int $id)
    {
        try {
            $this->maintenancePlanService->delete($id);

            return ApiResponse::success(null, 'Maintenance plan deleted successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Maintenance plan not found', 404);
        }
    }



}
