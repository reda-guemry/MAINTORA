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


}
