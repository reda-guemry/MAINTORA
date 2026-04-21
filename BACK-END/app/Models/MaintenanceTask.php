<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



#[Fillable([
    'machine_id',
    'maintenance_plan_id',
    'scheduled_at',
    'assigned_to',
    'status',
    'completed_at',
])]
class MaintenanceTask extends Model
{
    use HasFactory ; 

    /* * Relationships
     * belongs
     */
    public function machine()
    {
        return $this->belongsTo(Machine::class) ;
    }

    public function maintenancePlan()
    {
        return $this->belongsTo(MaintenancePlan::class) ;
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to') ;
    }

    public function checkItems()
    {
        return $this->hasMany(MaintenanceTaskCheck::class) ;
    }

    /* * Relationships
     * Has
     */

    public function anomalies()
    {
        return $this->hasMany(Anomaly::class) ;
    }


}
