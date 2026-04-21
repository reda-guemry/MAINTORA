<?php

namespace App\Repositories\Rounde;

use App\Models\MaintenanceTask;


class MaintenanceTaskRepository
{


    public function __construct()
    {
    }


    public function createOrUpate(array $attributeCheck , array $values)
    {
        return MaintenanceTask::updateOrCreate(
            $attributeCheck,
            $values
        );

    }


}
