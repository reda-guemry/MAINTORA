<?php

namespace App\Services\Anomaly;

use App\Repositories\Anomaly\AnomalyRepository;
use App\Repositories\Anomaly\RepairRequestRepository;
use App\Services\Rounde\MaintenanceTaskService;
use DB;
use Exception;
use Log;



class AnomalyService
{
    public function __construct(
        private AnomalyRepository $AnomalyRepository,
        private RepairRequestRepository $RepairRequestRepository,
        private MaintenanceTaskService $MaintenanceTaskService,
    ) {
    }

    public function paginate(array $filters = [], int $perPage = 10)
    {
        return $this->AnomalyRepository->paginate($filters, $perPage);
    }

    public function findOrFail(int $anomalyId)
    {
        return $this->AnomalyRepository->find($anomalyId);
    }

    public function createForAnomaly(int $anomalyId, array $data)
    {
        return DB::transaction(function () use ($anomalyId, $data) {
            $anomaly = $this->AnomalyRepository->findForRepairRequest($anomalyId);

            

            if ($anomaly->status !== 'open') {
                throw new Exception('Repair request can only be created for pending anomalies.', 422);
            }

            if ($anomaly->repairRequest()->exists()) {
                throw new Exception('A repair request already exists for this anomaly.', 422);
            }

            $machineCreatorId = $anomaly->machine->created_by;

            if (!$machineCreatorId) {
                throw new Exception('Machine creator not found.' , 404);
            }

            $repairRequest = $this->RepairRequestRepository->createForAnomaly($anomaly, $data , $machineCreatorId);

            $anomaly->update([
                'status' => 'in_progress',
            ]);

            return $repairRequest;
        });
    }

    public function createForTask(int $taskId, array $data)
    {
        $task = $this->MaintenanceTaskService->findAssignedTask($taskId);

        return $this->AnomalyRepository->createForTask($task, $data);
    }

}
