<?php

namespace App\Services\Machine;

use App\Repositories\Machine\MachineRepositoty;

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
        $user = auth('api')->user();

        return $this->machineRepositoty->create($data , $user);
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

    public function getAll()
    {
        return $this->machineRepositoty->All();
    }



}
