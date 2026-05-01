<?php

namespace App\Repositories\Technician;

use App\Models\Machine;
use App\Models\MaintenanceTask;
use App\Models\MaintenanceTaskCheck;
use App\Repositories\Anomaly\AnomalyRepository;

class TechnicianMaintenanceTaskRepository
{

    public function __construct(
        private AnomalyRepository $anomalyService,

    ) {
    }

    public function paginateAssignedTasks(array $filters = [], int $perPage = 10)
    {
        return $this->query()
            ->with([
                'machine.creator',
                'maintenancePlan.checklistTemplate',
                'assignedTo.roles',
            ])
            ->withCount('anomalies')
            ->when($filters['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($filters['scheduled_date'] ?? null, function ($query, $scheduledDate) {
                $query->whereDate('scheduled_at', $scheduledDate);
            })
            ->when($filters['week_start'] ?? null, function ($query, $weekStart) use ($filters) {
                $query->whereBetween('scheduled_at', [$weekStart, $filters['week_end']]);
            })
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->whereHas('machine', function ($machineQuery) use ($search) {
                    $machineQuery
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('code', 'like', "%{$search}%")
                        ->orWhere('location', 'like', "%{$search}%");
                });
            })
            ->orderBy('scheduled_at')
            ->paginate($perPage);
    }

    public function findAssignedTask(int $taskId)
    {
        return $this->query()
            ->with([
                'machine.creator',
                'assignedTo.roles',
                'maintenancePlan.assignedTo.roles',
                'maintenancePlan.checklistTemplate.checklistItems',
                'checkItems',
                'anomalies.machine',
                'anomalies.reportedBy.roles',
            ])
            ->withCount('anomalies')
            ->findOrFail($taskId);
    }

    public function update(MaintenanceTask $maintenanceTask, array $data)
    {
        $maintenanceTask->update($data);

        return $maintenanceTask->refresh();
    }

    public function saveChecks(MaintenanceTask $maintenanceTask, array $checks): void
    {
        foreach ($checks as $check) {
            MaintenanceTaskCheck::updateOrCreate(
                [
                    'maintenance_task_id' => $maintenanceTask->id,
                    'checklist_item_id' => $check['checklist_item_id'],
                ],
                [
                    'status' => $check['status'],
                    'comment' => $check['comment'] ?? null,
                ],
            );

            if ($check['status'] === 'anomaly') {
                $data = [
                    'machine_id' => $maintenanceTask->machine_id,
                    'reported_by' => auth('api')->id(),
                    'maintenance_task_id' => $maintenanceTask->id,
                    'title' => $check['anomaly']['title'],
                    'description' => $check['anomaly']['description'],
                    'severity' => $check['anomaly']['severity'],
                ];

                $this->anomalyService->createForTask($maintenanceTask, $data);
            }
        }
    }

    public function getAssignedMachines()
    {
        return Machine::whereIn(
            'id',
            $this->query()
                ->select('machine_id')
                ->distinct()
        )->with('creator')
            ->get();
    }

    private function query()
    {
        return MaintenanceTask::where('assigned_to', auth('api')->id());
    }

    public function getNextRoundDate()
    {
        $nextRound = $this->query()
            ->where('status', 'pending')
            ->orderBy('scheduled_at')
            ->first();

        return $nextRound ? $nextRound->scheduled_at : null;
    }

    public function countPendingTasks()
    {
        return $this->query()
            ->where('status', 'pending')
            ->count();
    }

    public function countCompletedTasks()
    {
        return $this->query()
            ->where('status', 'completed')
            ->count();
    }

    public function getNextRoundDateForTechnician(int $technicianId)
    {
        $nextRound = MaintenanceTask::where('assigned_to', $technicianId)
            ->where('status', 'pending')
            ->orderBy('scheduled_at')
            ->first();

        return $nextRound ? $nextRound->scheduled_at : null;
    }

    public function getFiveNextRound()
    {
        return $this->query()
            ->where('status', 'pending')
            ->orderBy('scheduled_at')
            ->take(5)
            ->get();
    }

}
