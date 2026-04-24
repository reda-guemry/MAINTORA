<?php

namespace App\Services\Client;

use App\Repositories\Client\ClientRepairRequestRepository;

class ClientRepairRequestService
{
    public function __construct(
        private ClientRepairRequestRepository $clientRepairRequestRepository,
    ) {}

    public function paginate(array $filters = [], int $perPage = 10)
    {
        return $this->clientRepairRequestRepository->paginate($filters, $perPage);
    }

    public function findOrFail(int $repairRequestId)
    {
        return $this->clientRepairRequestRepository->find($repairRequestId);
    }
}
