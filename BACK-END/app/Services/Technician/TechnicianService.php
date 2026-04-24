<?php

namespace App\Services\Technician;

use App\Repositories\Anomaly\AnomalyRepository;
use App\Repositories\Technician\TechnicianMaintenanceTaskRepository;
use App\Repositories\User\UserRepository;




class TechnicianService
{
    public function __construct(
        private AnomalyRepository $technicianAnomalyRepository,
        private TechnicianMaintenanceTaskRepository $technicianMaintenanceTaskRepository,
        private UserRepository  $userRepository,
    ) {}


    public function gettechnicians()
    {
        return $this -> userRepository -> getTechnicians();
    }




    public function statistics() 
    {
        $dateNextRound = $this -> technicianMaintenanceTaskRepository -> getNextRoundDate();
    
        $pendingTasksCount = $this -> technicianMaintenanceTaskRepository -> countPendingTasks();

        $totalCompletedTasks = $this -> technicianMaintenanceTaskRepository -> countCompletedTasks();

        $fiveNextRounde = $this -> technicianMaintenanceTaskRepository -> getFiveNextRound();

        return [
            'next_round_date' => $dateNextRound,
            'pending_tasks_count' => $pendingTasksCount,
            'total_completed_tasks' => $totalCompletedTasks,
            'five_next_rounde' => $fiveNextRounde,
        ];
        
    }




}
