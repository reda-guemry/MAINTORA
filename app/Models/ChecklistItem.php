<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


#[Fillable([
    'label',
])]

class ChecklistItem extends Model
{
    use HasFactory ;
    

    public function checklistTemplateItems()
    {
        return $this->hasMany(ChecklistTemplateItem::class) ;
    }


}
