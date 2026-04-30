<?php

namespace App\Services\Machine;

use App\Http\Resources\MachineHistoryTaskResource;
use App\Http\Resources\MachineResource;
use App\Repositories\Machine\MachineHistoryRepository;
use App\Repositories\Machine\MachineRepository;
use Exception;

class MachineHistoryService
{
    public function __construct(
        private MachineHistoryRepository $machineHistoryRepository,
        private MachineRepository $machineRepository,
    ) {}

    public function paginate(int $machineId, int $perPage = 10)
    {
        $machine = $this->findAuthorizedMachine($machineId);
        $tasks = $this->machineHistoryRepository->paginateTasksForMachine($machine->id, $perPage);

        $tasks->through(function ($task) {
            return new MachineHistoryTaskResource($task);
        });

        return [
            'machine' => MachineResource::make($machine),
            'tasks' => $tasks,
        ];
    }

    public function findTask(int $machineId, int $taskId)
    {
        $machine = $this->findAuthorizedMachine($machineId);

        return $this->machineHistoryRepository->findTaskForMachine($machine->id, $taskId);
    }

    private function findAuthorizedMachine(int $machineId)
    {
        $machine = $this->machineRepository->find($machineId);
        $user = auth('api')->user();

        if ($user?->hasRole('admin') || $user?->hasRole('chef technician')) {
            return $machine;
        }

        if ($user?->hasRole('client') && $machine->created_by === $user->id) {
            return $machine;
        }

        if ($user?->hasRole('technician') && $this->machineHistoryRepository->technicianCanAccessMachine($machine->id)) {
            return $machine;
        }

        throw new Exception('Unauthorized access to this machine history.', 403);
    }
}
