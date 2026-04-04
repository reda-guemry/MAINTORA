<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



#[Fillable([
    'name',
    'description',
    'created_by',
])]

class ChecklistTemplate extends Model
{
    
    use HasFactory ; 

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by') ;
    }

    public function checklistItems()
    {
        return $this->hasMany(ChecklistTemplateItem::class ) ;
    }

}
