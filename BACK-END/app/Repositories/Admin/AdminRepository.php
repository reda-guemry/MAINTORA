<?php

namespace App\Repositories\Admin;

use App\Models\Anomaly;
use App\Models\Machine;
use App\Models\MaintenanceTask;
use App\Models\RepairRequest;
use App\Models\User;

class AdminRepository
{
    public function countUsers()
    {
        return User::count();
    }

    public function countClients()
    {
        return User::role('client')->count();
    }

    public function countTechnicians()
    {
        return User::role('technician')->count();
    }

    public function countMachines()
    {
        return Machine::count();
    }

    public function countActiveAnomalies()
    {
        return Anomaly::whereIn('status', ['open', 'in_progress'])->count();
    }

    public function countOpenRepairRequests()
    {
        return RepairRequest::where('status', 'open')->count();
    }

    public function countCompletedMaintenanceTasks()
    {
        return MaintenanceTask::where('status', 'completed')->count();
    }

    public function recentUsers()
    {
        return User::with('roles')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'status' => $user->status,
                    'created_at' => $user->created_at,
                    'roles' => $user->roles->map(function ($role) {
                        return [
                            'id' => $role->id,
                            'name' => $role->name,
                        ];
                    }),
                ];
            });
    }
}
