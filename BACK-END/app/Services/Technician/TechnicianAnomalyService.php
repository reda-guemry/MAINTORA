<?php

namespace App\Services\Technician;

use App\Models\MaintenanceTask;
use App\Repositories\Technician\AnomalyRepository;




class TechnicianAnomalyService
{


    public function __construct(
        private AnomalyRepository $technicianAnomalyRepository,
        private TechnicianMaintenanceTaskService $technicianMaintenanceTaskService
        ) {}

    public function getPaginate(array $filters = [], int $perPage = 10)
    {
        return $this->technicianAnomalyRepository->paginateReportedAnomalies($filters, $perPage);
    }

    public function createForTask(int $taskId, array $data)
    {
        $task = $this->technicianMaintenanceTaskService->findAssignedTask($taskId);

        return $this->technicianAnomalyRepository->createForTask($task, $data);
    }

    
}
