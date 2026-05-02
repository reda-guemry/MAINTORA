<?php

namespace App\Services\ChefTechnician;

use App\Repositories\ChefTechnician\ChefTechnicianDashboardRepository;

class ChefTechnicianDashboardService
{
    public function __construct(
        private ChefTechnicianDashboardRepository $chefTechnicianDashboardRepository,
    ) {}

    public function statistics()
    {
        return [
            'stats' => [
                'total_machines' => $this->chefTechnicianDashboardRepository->countMachines(),
                'active_machines' => $this->chefTechnicianDashboardRepository->countActiveMachines(),
                'inactive_machines' => $this->chefTechnicianDashboardRepository->countInactiveMachines(),
                'total_technicians' => $this->chefTechnicianDashboardRepository->countTechnicians(),
                'total_checklist_templates' => $this->chefTechnicianDashboardRepository->countChecklistTemplates(),
                'total_maintenance_plans' => $this->chefTechnicianDashboardRepository->countMaintenancePlans(),
                'active_maintenance_plans' => $this->chefTechnicianDashboardRepository->countActiveMaintenancePlans(),
                'inactive_maintenance_plans' => $this->chefTechnicianDashboardRepository->countInactiveMaintenancePlans(),
                'total_anomalies' => $this->chefTechnicianDashboardRepository->countAnomalies(),
                'open_anomalies' => $this->chefTechnicianDashboardRepository->countOpenAnomalies(),
                'critical_anomalies' => $this->chefTechnicianDashboardRepository->countCriticalAnomalies(),
                'pending_rounds' => $this->chefTechnicianDashboardRepository->countPendingRounds(),
                'completed_rounds' => $this->chefTechnicianDashboardRepository->countCompletedRounds(),
                'overdue_rounds' => $this->chefTechnicianDashboardRepository->countOverdueRounds(),
            ],
            'recent_anomalies' => $this->chefTechnicianDashboardRepository->recentAnomalies(),
            'recent_maintenance_plans' => $this->chefTechnicianDashboardRepository->recentMaintenancePlans(),
            'recent_rounds' => $this->chefTechnicianDashboardRepository->recentRounds(),
        ];
    }
}
