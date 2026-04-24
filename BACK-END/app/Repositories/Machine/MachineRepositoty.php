<?php

namespace App\Repositories\Machine;

use App\Models\Machine;

class MachineRepositoty
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getPaginate()
    {
        return Machine::where('created_by', auth('api')->id())->paginate(10);
    }

    public function create($data, $user)
    {
        return $user->machines()->create($data);
    }

    public function find($id)
    {
        return Machine::findOrFail($id);
    }

    public function update($id, $data)
    {
        $machine = Machine::findOrFail($id);
        $machine->update($data);
        return $machine;
    }

    public function delete($id)
    {
        $machine = Machine::findOrFail($id);
        return $machine->delete();
    }

    public function All()
    {
        return Machine::with([
            'creator',
            'maintenancePlans.assignedTo.roles',
            'maintenancePlans.checklistTemplate',
        ])->get();
    }

    //modifier machiine have machintask today to status maintenance in progress
    public function getMachinesWithScheduledMaintenance()
    {
        return Machine::with('maintenanceTasks')
            ->whereHas('maintenanceTasks', function ($query) {
                $query->whereDate('scheduled_at', now()->toDateString())
                    ->where('status', 'pending');
            })
            ->get();
    }



}
