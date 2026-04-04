<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


#[Fillable([
    'order',
])]
class ChecklistTemplateItem extends Model
{
    use HasFactory ; 


    public function checklistTemplate()
    {
        return $this->belongsTo(ChecklistTemplate::class) ;
    }

    public function checklistItem()
    {
        return $this->belongsTo(ChecklistItem::class) ;
    }


}
