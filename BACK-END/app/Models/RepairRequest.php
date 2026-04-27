<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



#[Fillable([
    'machine_id',
    'requested_by',
    'anomaly_id',
    'assigned_to',
    'title' , 
    'status',
    'description',
    'estimated_cost' 
])]
class RepairRequest extends Model
{
    use HasFactory ;

    public function machine()
    {
        return $this->belongsTo(Machine::class) ;
    }

    public function requester()
    {
        return $this->belongsTo(User::class, 'requested_by') ; 
    }

    public function requestedBy()
    {
        return $this->belongsTo(User::class, 'requested_by') ;
    }

    public function anomaly()
    {
        return $this->belongsTo(Anomaly::class) ;
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to') ;
    }

    public function purchaseOrder()
    {
        return $this->hasOne(RepairPurchaseOrder::class) ;
    }


}
