<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



#[Fillable([
    'repair_request_id',
    'uploaded_by',
    'file_path',
    'original_file_name',
    'status',
])]
class RepairPurchaseOrder extends Model
{
    use HasFactory ; 

    protected $table = 'repair_purchase_orders';


    public function repairRequest()
    {
        return $this->belongsTo(RepairRequest::class) ;
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by') ;
    }

}
