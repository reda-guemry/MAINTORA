<?php

namespace App\Services\Client;

use App\Repositories\Client\MachineRepositoty;

class MachineService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private MachineRepositoty $machineRepositoty,
    ){}


    public function getPaginate()
    {
        return $this->machineRepositoty->getPaginate();
    }

    public function create($data)
    {
        return $this->machineRepositoty->create($data);
    }

    public function findOrFail($id)
    {
        return $this->machineRepositoty->find($id);
    }

    public function update($id, $data)
    {
        return $this->machineRepositoty->update($id, $data);
    }

    public function delete($id)
    {
        return $this->machineRepositoty->delete($id);
    }



}
