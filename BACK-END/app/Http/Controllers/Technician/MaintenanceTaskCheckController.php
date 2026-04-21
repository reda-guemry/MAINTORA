<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Services\Technician\TechnicianMaintenanceTaskService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class MaintenanceTaskCheckController extends Controller
{
    public function __construct(
        private TechnicianMaintenanceTaskService $technicianMaintenanceTaskService,
    ) {}

    public function create()
    {
        //
    }

}
