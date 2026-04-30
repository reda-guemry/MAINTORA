<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



#[Fillable([
    'code' ,
    'name',
    'location',
    'latitude',
    'longitude',
    'status',
    'created_by',
])]

class Machine extends Model
{
    use HasFactory ; 

    
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function maintenancePlans()
    {
        return $this->hasMany(MaintenancePlan::class);
    }

    public function anomalies()
    {
        return $this->hasMany(Anomaly::class);
    }

    

    public function haveActiveMaintenancePlan()
    {
        return $this->maintenancePlans()->where('status', 'active')->exists();
    }
}
