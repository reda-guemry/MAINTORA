<?php

namespace App\Services\Client;

use App\Repositories\Client\ClientDashboardRepository;

class ClientDashboardService
{
    public function __construct(
        private ClientDashboardRepository $clientDashboardRepository,
    ) {}

    public function dashboard()
    {
        return [
            'stats' => [
                'total_machines' => $this->clientDashboardRepository->countMachines(),
                'active_anomalies' => $this->clientDashboardRepository->countActiveAnomalies(),
                'pending_repair_requests' => $this->clientDashboardRepository->countPendingRepairRequests(),
                'completed_tasks' => $this->clientDashboardRepository->countCompletedTasks(),
            ],
            'recent_anomalies' => $this->clientDashboardRepository->recentAnomalies(),
            'recent_repair_requests' => $this->clientDashboardRepository->recentRepairRequests(),
        ];
    }
}
