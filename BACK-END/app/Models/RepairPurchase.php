<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



#[Fillable([
    'file_path',
    'original_file_name',
    'status',
])]
class RepairPurchase extends Model
{
    use HasFactory ; 


    public function repairRequest()
    {
        return $this->belongsTo(RepairRequest::class) ;
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by') ;
    }

}
