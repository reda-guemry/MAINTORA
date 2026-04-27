<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


#[Fillable([
    'machine_id',
    'reported_by',
    'maintenance_task_id',
    'title',
    'description',
    'severity',
    'status',
])]
class Anomaly extends Model
{
    use HasFactory;

    public function machine()
    {
        return $this->belongsTo(Machine::class) ;
    }

    public function reportedBy()
    {
        return $this->belongsTo(User::class, 'reported_by') ;
    }

    public function maintenanceTask()
    {
        return $this->belongsTo(MaintenanceTask::class) ;
    }

    public function repairRequest()
    {
        return $this->hasMany(RepairRequest::class) ;
    }

}
