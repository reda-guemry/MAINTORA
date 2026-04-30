<?php

namespace App\Services\Admin;

use App\Repositories\Admin\AdminRepository;

class AdminService
{
    public function __construct(
        private AdminRepository $adminDashboardRepository,
    ) {}

    public function dashboard()
    {
        return [
            'stats' => [
                'total_users' => $this->adminDashboardRepository->countUsers(),
                'total_clients' => $this->adminDashboardRepository->countClients(),
                'total_technicians' => $this->adminDashboardRepository->countTechnicians(),
                'total_machines' => $this->adminDashboardRepository->countMachines(),
                'active_anomalies' => $this->adminDashboardRepository->countActiveAnomalies(),
                'open_repair_requests' => $this->adminDashboardRepository->countOpenRepairRequests(),
                'completed_maintenance_tasks' => $this->adminDashboardRepository->countCompletedMaintenanceTasks(),
            ],
            'recent_users' => $this->adminDashboardRepository->recentUsers(),
        ];
    }
}
