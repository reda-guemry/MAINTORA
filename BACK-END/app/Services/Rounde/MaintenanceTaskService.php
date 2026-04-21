<?php

namespace App\Services\Rounde;

use App\Repositories\Rounde\MaintenancePlanRepository;
use App\Services\Machine\MachineService;
use App\Services\User\UserService;
use DB;
use Exception;


class MaintenanceTaskService
{
    public function __construct(
        private MaintenancePlanRepository $maintenancePlanRepository,
        private MachineService $machineService,
        private UserService $userService,
    ) {}

    



}
