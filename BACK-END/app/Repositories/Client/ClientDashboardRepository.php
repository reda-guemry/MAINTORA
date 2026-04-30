<?php

namespace App\Repositories\Client;

use App\Models\Anomaly;
use App\Models\Machine;
use App\Models\MaintenanceTask;
use App\Models\RepairRequest;

class ClientDashboardRepository
{
    public function countMachines()
    {
        return Machine::where('created_by', auth('api')->id())->count();
    }

    public function countActiveAnomalies()
    {
        return $this->clientAnomaliesQuery()
            ->whereIn('status', ['open', 'in_progress'])
            ->count();
    }

    public function countPendingRepairRequests()
    {
        return $this->clientRepairRequestsQuery()
            ->where('status', 'open')
            ->count();
    }

    public function countCompletedTasks()
    {
        return MaintenanceTask::whereHas('machine', function ($machineQuery) {
            $machineQuery->where('created_by', auth('api')->id());
        })
            ->where('status', 'completed')
            ->count();
    }

    public function recentAnomalies()
    {
        return $this->clientAnomaliesQuery()
            ->with('machine:id,code,name')
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

    public function recentRepairRequests()
    {
        return $this->clientRepairRequestsQuery()
            ->with('machine:id,code,name')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($repairRequest) {
                return [
                    'id' => $repairRequest->id,
                    'title' => $repairRequest->title,
                    'status' => $repairRequest->status,
                    'estimated_cost' => $repairRequest->estimated_cost,
                    'created_at' => $repairRequest->created_at,
                    'machine' => [
                        'id' => $repairRequest->machine?->id,
                        'code' => $repairRequest->machine?->code,
                        'name' => $repairRequest->machine?->name,
                    ],
                ];
            });
    }

    private function clientAnomaliesQuery()
    {
        return Anomaly::whereHas('machine', function ($machineQuery) {
            $machineQuery->where('created_by', auth('api')->id());
        });
    }

    private function clientRepairRequestsQuery()
    {
        return RepairRequest::whereHas('machine', function ($machineQuery) {
            $machineQuery->where('created_by', auth('api')->id());
        });
    }
}
