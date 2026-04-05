<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


#[Fillable([
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


     public function maintenanceTasks()
    {
        return $this->hasOne(MaintenanceTask::class) ;
    }

}
