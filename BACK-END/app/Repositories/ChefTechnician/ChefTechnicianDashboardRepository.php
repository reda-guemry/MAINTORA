<?php

namespace App\Repositories\ChefTechnician;

use App\Models\Anomaly;
use App\Models\ChecklistTemplate;
use App\Models\Machine;
use App\Models\MaintenancePlan;
use App\Models\MaintenanceTask;
use App\Models\User;

class ChefTechnicianDashboardRepository
{
    public function countMachines()
    {
        return Machine::count();
    }

    public function countActiveMachines()
    {
        return Machine::where('status', 'active')->count();
    }

    public function countInactiveMachines()
    {
        return Machine::where('status', '!=', 'active')->count();
    }

    public function countTechnicians()
    {
        return User::role('technician')->count();
    }

    public function countChecklistTemplates()
    {
        return ChecklistTemplate::count();
    }

    public function countMaintenancePlans()
    {
        return MaintenancePlan::count();
    }

    public function countActiveMaintenancePlans()
    {
        return MaintenancePlan::where('status', 'active')->count();
    }

    public function countInactiveMaintenancePlans()
    {
        return MaintenancePlan::where('status', 'inactive')->count();
    }

    public function countAnomalies()
    {
        return Anomaly::count();
    }

    public function countOpenAnomalies()
    {
        return Anomaly::whereIn('status', ['open', 'in_progress'])->count();
    }

    public function countCriticalAnomalies()
    {
        return Anomaly::where('severity', 'high')->count();
    }

    public function countPendingRounds()
    {
        return MaintenanceTask::where('status', 'pending')->count();
    }

    public function countCompletedRounds()
    {
        return MaintenanceTask::where('status', 'completed')->count();
    }

    public function countOverdueRounds()
    {
        return MaintenanceTask::whereIn('status', ['pending', 'in_progress'])
            ->where('scheduled_at', '<', now())
            ->count();
    }

    public function recentAnomalies()
    {
        return Anomaly::with('machine:id,code,name')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($anomaly) {
                return [
                    'id' => $anomaly->id,
                    'title' => $anomaly->title,
                    'severity' => $anomaly->severity,
                    'status' => $anomaly->status,
                    'created_at' => $anomaly->created_at,
                    'machine' => [
                        'id' => $anomaly->machine?->id,
                        'code' => $anomaly->machine?->code,
                        'name' => $anomaly->machine?->name,
                    ],
                ];
            });
    }

    public function recentMaintenancePlans()
    {
        return MaintenancePlan::with([
            'machine:id,code,name',
            'assignedTo:id,first_name,last_name',
            'checklistTemplate:id,name',
        ])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($maintenancePlan) {
                return [
                    'id' => $maintenancePlan->id,
                    'status' => $maintenancePlan->status,
                    'repeat_every' => $maintenancePlan->repeat_every,
                    'repeat_unit' => $maintenancePlan->repeat_unit,
                    'start_date' => $maintenancePlan->start_date,
                    'machine' => [
                        'id' => $maintenancePlan->machine?->id,
                        'code' => $maintenancePlan->machine?->code,
                        'name' => $maintenancePlan->machine?->name,
                    ],
                    'assigned_to' => [
                        'id' => $maintenancePlan->assignedTo?->id,
                        'first_name' => $maintenancePlan->assignedTo?->first_name,
                        'last_name' => $maintenancePlan->assignedTo?->last_name,
                    ],
                    'checklist_template' => [
                        'id' => $maintenancePlan->checklistTemplate?->id,
                        'name' => $maintenancePlan->checklistTemplate?->name,
                    ],
                ];
            });
    }

    public function recentRounds()
    {
        return MaintenanceTask::with([
            'machine:id,code,name',
            'assignedTo:id,first_name,last_name',
        ])
            ->latest('scheduled_at')
            ->take(5)
            ->get()
            ->map(function ($maintenanceTask) {
                return [
                    'id' => $maintenanceTask->id,
                    'status' => $maintenanceTask->status,
                    'scheduled_at' => $maintenanceTask->scheduled_at,
                    'completed_at' => $maintenanceTask->completed_at,
                    'machine' => [
                        'id' => $maintenanceTask->machine?->id,
                        'code' => $maintenanceTask->machine?->code,
                        'name' => $maintenanceTask->machine?->name,
                    ],
                    'assigned_to' => [
                        'id' => $maintenanceTask->assignedTo?->id,
                        'first_name' => $maintenanceTask->assignedTo?->first_name,
                        'last_name' => $maintenanceTask->assignedTo?->last_name,
                    ],
                ];
            });
    }
}
